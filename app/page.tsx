"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const TERMINAL_BOOT_LINES = [
  "$ connect --region sacramento",
  "[ok] session established: sac-history-node",
];

const TERMINAL_FACT_LINES = [
  "landmark: Tower Bridge opened in 1935 as a vertical-lift bridge.",
  "landmark: California State Capitol completed in 1874.",
  "history: Old Sacramento was designated a National Historic Landmark in 1965.",
  "landmark: Crocker Art Museum is the oldest public art museum west of the Mississippi.",
  "history: Sutter's Fort was established in 1839 and anchored early settlement growth.",
  "landmark: Cathedral of the Blessed Sacrament was dedicated in 1889.",
] as const;

const TERMINAL_TIMING = {
  commandStartDelayMs: 3000,
  statusLineDelayAfterCommandMs: 900,
  typingIntervalMs: 26,
  firstFactDelayMs: 15000,
  factIntervalMs: 10000,
} as const;

const INTERACTION_TIMING = {
  phaseGainPerMove: 3.5,
  maxPointerStepPerFrame: 0.03,
} as const;

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [typingLine, setTypingLine] = useState("");

  useEffect(() => {
    let cancelled = false;
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, delay: number) => {
      if (cancelled) return;
      const id = setTimeout(fn, delay);
      timeoutIds.push(id);
    };

    const typeLine = (line: string, charIndex = 0, onDone?: () => void) => {
      if (cancelled) return;
      if (charIndex < line.length) {
        const nextIndex = charIndex + 1;
        setTypingLine(line.slice(0, nextIndex));
        schedule(
          () => typeLine(line, nextIndex, onDone),
          TERMINAL_TIMING.typingIntervalMs,
        );
        return;
      }
      setTerminalLines((prev) => [...prev, line].slice(-9));
      setTypingLine("");
      onDone?.();
    };

    schedule(() => {
      typeLine(TERMINAL_BOOT_LINES[0], 0, () => {
        schedule(
          () => typeLine(TERMINAL_BOOT_LINES[1]),
          TERMINAL_TIMING.statusLineDelayAfterCommandMs,
        );
      });
    }, TERMINAL_TIMING.commandStartDelayMs);

    const typeFactAtIndex = (idx: number) => {
      if (cancelled || idx >= TERMINAL_FACT_LINES.length) return;
      typeLine(TERMINAL_FACT_LINES[idx], 0, () => {
        schedule(
          () => typeFactAtIndex(idx + 1),
          TERMINAL_TIMING.factIntervalMs,
        );
      });
    };

    schedule(() => typeFactAtIndex(0), TERMINAL_TIMING.firstFactDelayMs);

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!wrapper || !displayCanvas) return;

    const glCanvas = document.createElement("canvas");
    const gl = glCanvas.getContext("webgl", { antialias: true });
    const displayCtx = displayCanvas.getContext("2d");
    if (!gl || !displayCtx) return;
    const glx = gl;

    const CONFIG = {
      baseColor: [0.1, 0.1, 0.1] as [number, number, number],
      speed: 1,
      amplitude: 0.6,
      frequencyX: 3,
      frequencyY: 3,
      interactive: true,
    };

    const VERT_SRC = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const FRAG_SRC = `
      precision highp float;
      uniform float uTime;
      uniform vec3  uResolution;
      uniform vec3  uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2  uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
        vec2 fragCoord = uvCoord * uResolution.xy;
        vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);
        for (float i = 1.0; i < 10.0; i++) {
          uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
          uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
        }
        vec2 diff = (uvCoord - uMouse);
        float dist = length(diff);
        float falloff = exp(-dist * 20.0);
        float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
        uv += (diff / (dist + 0.0001)) * ripple * falloff;
        vec3 raw = uBaseColor / abs(sin(uTime - uv.y - uv.x));
        float luma = dot(raw, vec3(0.299, 0.587, 0.114));
        float chrome = smoothstep(0.08, 0.95, luma);
        chrome = pow(chrome, 0.72);
        vec3 color = mix(vec3(0.03, 0.03, 0.035), vec3(0.98, 0.98, 0.99), chrome);
        return vec4(color, 1.0);
      }

      void main() {
        vec4 col = vec4(0.0);
        int samples = 0;
        for (int i = -1; i <= 1; i++){
          for (int j = -1; j <= 1; j++){
            vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
            col += renderImage(vUv + offset);
            samples++;
          }
        }
        gl_FragColor = col / float(samples);
      }
    `;

    function compile(type: number, src: string) {
      const shader = glx.createShader(type);
      if (!shader) return null;
      glx.shaderSource(shader, src);
      glx.compileShader(shader);
      if (!glx.getShaderParameter(shader, glx.COMPILE_STATUS)) {
        console.error(glx.getShaderInfoLog(shader));
        glx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(vsSrc: string, fsSrc: string) {
      const vs = compile(glx.VERTEX_SHADER, vsSrc);
      const fs = compile(glx.FRAGMENT_SHADER, fsSrc);
      if (!vs || !fs) return null;
      const prog = glx.createProgram();
      if (!prog) return null;
      glx.attachShader(prog, vs);
      glx.attachShader(prog, fs);
      glx.linkProgram(prog);
      if (!glx.getProgramParameter(prog, glx.LINK_STATUS)) {
        console.error(glx.getProgramInfoLog(prog));
        glx.deleteProgram(prog);
        return null;
      }
      glx.useProgram(prog);
      return prog;
    }

    const program = createProgram(VERT_SRC, FRAG_SRC);
    if (!program) return;

    const tri = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const vbo = glx.createBuffer();
    glx.bindBuffer(glx.ARRAY_BUFFER, vbo);
    glx.bufferData(glx.ARRAY_BUFFER, tri, glx.STATIC_DRAW);
    const aPos = glx.getAttribLocation(program, "aPosition");
    glx.enableVertexAttribArray(aPos);
    glx.vertexAttribPointer(aPos, 2, glx.FLOAT, false, 0, 0);

    const uTime = glx.getUniformLocation(program, "uTime");
    const uResolution = glx.getUniformLocation(program, "uResolution");
    const uBaseColor = glx.getUniformLocation(program, "uBaseColor");
    const uAmplitude = glx.getUniformLocation(program, "uAmplitude");
    const uFrequencyX = glx.getUniformLocation(program, "uFrequencyX");
    const uFrequencyY = glx.getUniformLocation(program, "uFrequencyY");
    const uMouse = glx.getUniformLocation(program, "uMouse");

    glx.uniform3f(uBaseColor, ...CONFIG.baseColor);
    glx.uniform1f(uAmplitude, CONFIG.amplitude);
    glx.uniform1f(uFrequencyX, CONFIG.frequencyX);
    glx.uniform1f(uFrequencyY, CONFIG.frequencyY);

    let mouse = { x: 0.5, y: 0.5 };
    let phase = 0;
    glx.uniform2f(uMouse, mouse.x, mouse.y);
    glx.uniform1f(uTime, phase);

    const drawMaskText = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      fill = "#fff",
      drawNeonOutline = false,
    ) => {
      const lockupWidth = Math.min(width * 0.9, 1080);
      const markSize = lockupWidth * 0.33;
      const gap = markSize * 0.11;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.fillStyle = fill;
      ctx.textBaseline = "alphabetic";

      ctx.font = `italic 800 ${markSize}px "STWMark", "Arial Black", "Segoe UI", sans-serif`;
      const markText = "STW";
      const markMetrics = ctx.measureText(markText);
      const markWidth = markMetrics.width;
      const markAscent = markMetrics.actualBoundingBoxAscent || markSize * 0.78;
      const markDescent = markMetrics.actualBoundingBoxDescent || markSize * 0.22;
      const markHeight = markAscent + markDescent;

      // Solve word size so 3 lines + 2 gaps match STW block height.
      const WORD_HEIGHT_FACTOR = 0.82;
      const WORD_GAP_FACTOR = 0.08;
      const wordSize =
        markHeight / (WORD_HEIGHT_FACTOR * 3 + WORD_GAP_FACTOR * 2);

      ctx.font = `italic 700 ${wordSize}px "STWWordmark", "STWMark", "Arial Black", "Segoe UI", sans-serif`;
      const words = ["Sac", "Tech", "Week"];
      const wordWidths = words.map((w) => ctx.measureText(w).width);
      const wordBlockWidth = Math.max(1, ...wordWidths);
      const lineGap = wordSize * WORD_GAP_FACTOR;
      const wordHeight = wordSize * WORD_HEIGHT_FACTOR;
      const wordBlockHeight = wordHeight * 3 + lineGap * 2;

      const totalWidth = markWidth + gap + wordBlockWidth;
      const left = -totalWidth * 0.5;
      const top = -Math.max(markHeight, wordBlockHeight) * 0.5;
      const wordX = left + markWidth + gap;

      const markBaseline = top + markAscent;
      ctx.font = `italic 800 ${markSize}px "STWMark", "Arial Black", "Segoe UI", sans-serif`;
      ctx.fillText(markText, left, markBaseline);

      ctx.font = `italic 700 ${wordSize}px "STWWordmark", "STWMark", "Arial Black", "Segoe UI", sans-serif`;
      let y = top + wordHeight;
      for (const word of words) {
        ctx.fillText(word, wordX, y);
        y += wordHeight + lineGap;
      }

      if (drawNeonOutline) {
        const localMouseX = mouse.x * width - centerX;
        const localMouseY = (1 - mouse.y) * height - centerY;
        const radius = Math.max(width, height) * 0.55;
        const neon = ctx.createRadialGradient(
          localMouseX,
          localMouseY,
          0,
          localMouseX,
          localMouseY,
          radius,
        );
        neon.addColorStop(0, "rgba(255, 255, 255, 1)");
        neon.addColorStop(0.22, "rgba(255, 255, 255, 0.92)");
        neon.addColorStop(0.5, "rgba(255, 255, 255, 0.56)");
        neon.addColorStop(1, "rgba(255, 255, 255, 0.2)");

        ctx.strokeStyle = neon;
        ctx.lineWidth = Math.max(3, markSize * 0.0008);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.shadowBlur = Math.max(9, markSize * 0.045);
        ctx.shadowColor = "rgba(255, 255, 255, 0.96)";

        ctx.font = `italic 800 ${markSize}px "STWMark", "Arial Black", "Segoe UI", sans-serif`;
        ctx.strokeText(markText, left, markBaseline);

        ctx.font = `italic 700 ${wordSize}px "STWWordmark", "STWMark", "Arial Black", "Segoe UI", sans-serif`;
        y = top + wordHeight;
        for (const word of words) {
          ctx.strokeText(word, wordX, y);
          y += wordHeight + lineGap;
        }
      }

      ctx.restore();
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      glCanvas.width = width;
      glCanvas.height = height;
      displayCanvas.width = width;
      displayCanvas.height = height;
      glx.viewport(0, 0, width, height);
      glx.uniform3f(uResolution, width, height, width / height);
      glx.clearColor(0, 0, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);

    const onPointerMove = (event: PointerEvent) => {
      if (!CONFIG.interactive) return;
      const rect = wrapper.getBoundingClientRect();
      const nextMouse = {
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height)),
      };
      const dx = nextMouse.x - mouse.x;
      const dy = nextMouse.y - mouse.y;
      const delta = Math.sqrt(dx * dx + dy * dy);
      phase +=
        Math.min(delta, INTERACTION_TIMING.maxPointerStepPerFrame) *
        INTERACTION_TIMING.phaseGainPerMove;
      mouse = {
        x: nextMouse.x,
        y: nextMouse.y,
      };
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!CONFIG.interactive || !event.touches[0]) return;
      const t = event.touches[0];
      const rect = wrapper.getBoundingClientRect();
      const nextMouse = {
        x: Math.max(0, Math.min(1, (t.clientX - rect.left) / rect.width)),
        y: Math.max(0, Math.min(1, 1 - (t.clientY - rect.top) / rect.height)),
      };
      const dx = nextMouse.x - mouse.x;
      const dy = nextMouse.y - mouse.y;
      const delta = Math.sqrt(dx * dx + dy * dy);
      phase +=
        Math.min(delta, INTERACTION_TIMING.maxPointerStepPerFrame) *
        INTERACTION_TIMING.phaseGainPerMove;
      mouse = {
        x: nextMouse.x,
        y: nextMouse.y,
      };
    };

    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("touchmove", onTouchMove, { passive: true });

    let raf = 0;
    let frameCount = 0;
    const render = () => {
      glx.uniform1f(uTime, phase);
      glx.uniform2f(uMouse, mouse.x, mouse.y);
      glx.clear(glx.COLOR_BUFFER_BIT);
      glx.drawArrays(glx.TRIANGLES, 0, 3);

      displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
      drawMaskText(displayCtx, displayCanvas.width, displayCanvas.height);
      displayCtx.globalCompositeOperation = "source-in";
      displayCtx.drawImage(glCanvas, 0, 0);
      displayCtx.globalCompositeOperation = "source-over";
      drawMaskText(displayCtx, displayCanvas.width, displayCanvas.height, "#00000000", true);

      // Hard fallback: if initial frames are blank, force visible text.
      if (frameCount < 3) {
        const sample = displayCtx.getImageData(
          Math.floor(displayCanvas.width * 0.5),
          Math.floor(displayCanvas.height * 0.5),
          1,
          1,
        ).data;
        if (sample[3] === 0) {
          displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
          drawMaskText(displayCtx, displayCanvas.width, displayCanvas.height, "#d9dde3");
        }
      }
      frameCount += 1;

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    void document.fonts.ready.then(() => {
      // Let the next frame pick up loaded fonts if available.
    });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <main className={styles.home}>
      <div className={styles.terminalBackdrop} aria-hidden>
        {terminalLines.map((line, idx) => (
          <p key={`${line}-${idx}`} className={styles.terminalLine}>
            {line}
          </p>
        ))}
        <p className={styles.terminalLine}>
          {typingLine}
          <span className={styles.cursor}>_</span>
        </p>
      </div>
      <div ref={wrapperRef} className={styles.chromeWrap} aria-label="STW Sac Tech Week">
        <canvas ref={displayCanvasRef} className={styles.chromeCanvas} />
      </div>
    </main>
  );
}
