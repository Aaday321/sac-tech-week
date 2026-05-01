import "./lockup-fonts.css";
import {
  HERO_GLITCH_TIMING,
  INTERACTION_TIMING,
  LIQUID_CHROME_SHADER,
  LOCKUP_SIZE,
  MOBILE_HERO,
  NEON_OUTLINE,
} from "./lockup-config";

/**
 * Mounts WebGL liquid chrome + canvas text mask, neon outline, and glitch bursts
 * on the given wrapper (sizing) and display canvas. Returns cleanup.
 */
export function initLiquidChromeLockup(
  wrapper: HTMLDivElement,
  displayCanvas: HTMLCanvasElement,
): () => void {
  const lockupCanvasWidth = (w: number) =>
    Math.min(w * LOCKUP_SIZE.widthFraction, LOCKUP_SIZE.maxCanvasPx) * LOCKUP_SIZE.scale;

  const glCanvas = document.createElement("canvas");
  /** iOS Safari often returns a blank texture when drawing an off-DOM WebGL canvas into 2D unless the buffer is preserved and the canvas is in the document. */
  const glContextAttrs: WebGLContextAttributes = {
    alpha: true,
    /** false improves WebGL context availability on some mobile GPUs */
    antialias: false,
    preserveDrawingBuffer: true,
    /** avoids Safari/iOS mishandling of premultiplied WebGL → 2D copies */
    premultipliedAlpha: false,
  };
  const gl =
    glCanvas.getContext("webgl", glContextAttrs) ??
    (glCanvas.getContext(
      "experimental-webgl",
      glContextAttrs,
    ) as WebGLRenderingContext | null);
  const displayCtx = displayCanvas.getContext("2d");
  const glitchSnapshot = document.createElement("canvas");
  const glitchSnapCtx = glitchSnapshot.getContext("2d");
  if (!gl || !displayCtx || !glitchSnapCtx) {
    return () => {};
  }
  const glx = gl;

  const CONFIG = LIQUID_CHROME_SHADER;

  let lastDpr = 1;
  let mobileHero = false;
  const pressedMobilePointers = new Set<number>();
  const mqCoarse = window.matchMedia("(pointer: coarse)");
  const mqNarrow = window.matchMedia("(max-width: 768px)");
  const syncMobileHero = () => {
    const wasMobile = mobileHero;
    mobileHero = mqCoarse.matches || mqNarrow.matches;
    if (wasMobile && !mobileHero) {
      pressedMobilePointers.clear();
    }
  };
  syncMobileHero();
  const onMobileMq = () => syncMobileHero();
  mqCoarse.addEventListener("change", onMobileMq);
  mqNarrow.addEventListener("change", onMobileMq);

  const mqReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reduceMotion = mqReduceMotion.matches;
  const onReduceMotion = () => {
    reduceMotion = mqReduceMotion.matches;
  };
  mqReduceMotion.addEventListener("change", onReduceMotion);

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
  if (!program) {
    return () => {};
  }

  glCanvas.setAttribute("aria-hidden", "true");
  /** opacity:0 can make drawImage(glCanvas) sample a blank buffer on iOS; visibility keeps pixels readable. */
  glCanvas.style.cssText =
    "display:block;position:absolute;inset:0;width:100%;height:100%;visibility:hidden;pointer-events:none;z-index:0";
  wrapper.insertBefore(glCanvas, displayCanvas);

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
    options?: {
      offsetX?: number;
      offsetY?: number;
      strokeOnly?: boolean;
      lineWidth?: number;
      strokeStyle?: string | CanvasGradient;
      shadowBlur?: number;
      shadowColor?: string;
    },
  ) => {
    const lockupWidth = lockupCanvasWidth(width);
    const markSize = lockupWidth * 0.33;
    const gap = markSize * 0.11;
    const offsetX = options?.offsetX ?? 0;
    const offsetY = options?.offsetY ?? 0;
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    ctx.save();
    ctx.translate(centerX + offsetX, centerY + offsetY);
    ctx.fillStyle = fill;
    ctx.textBaseline = "alphabetic";

    ctx.font = `italic 800 ${markSize}px "STWMark", "Arial Black", "Segoe UI", sans-serif`;
    const markText = "STW";
    const markMetrics = ctx.measureText(markText);
    const markWidth = markMetrics.width;
    const markAscent = markMetrics.actualBoundingBoxAscent || markSize * 0.78;
    const markDescent = markMetrics.actualBoundingBoxDescent || markSize * 0.22;
    const markHeight = markAscent + markDescent;

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
    if (options?.strokeOnly) {
      ctx.lineWidth = options.lineWidth ?? Math.max(0.8, markSize * 0.0013);
      ctx.strokeStyle = options.strokeStyle ?? fill;
      ctx.shadowBlur = options.shadowBlur ?? 0;
      ctx.shadowColor = options.shadowColor ?? "transparent";
      ctx.strokeText(markText, left, markBaseline);
    } else {
      ctx.fillText(markText, left, markBaseline);
    }

    ctx.font = `italic 700 ${wordSize}px "STWWordmark", "STWMark", "Arial Black", "Segoe UI", sans-serif`;
    let y = top + wordHeight;
    for (const word of words) {
      if (options?.strokeOnly) {
        ctx.strokeText(word, wordX, y);
      } else {
        ctx.fillText(word, wordX, y);
      }
      y += wordHeight + lineGap;
    }

    if (drawNeonOutline) {
      const strokeLockupGlyphs = () => {
        ctx.font = `italic 800 ${markSize}px "STWMark", "Arial Black", "Segoe UI", sans-serif`;
        ctx.strokeText(markText, left, markBaseline);
        ctx.font = `italic 700 ${wordSize}px "STWWordmark", "STWMark", "Arial Black", "Segoe UI", sans-serif`;
        let yy = top + wordHeight;
        for (const word of words) {
          ctx.strokeText(word, wordX, yy);
          yy += wordHeight + lineGap;
        }
      };

      if (mobileHero) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = Math.max(1, MOBILE_HERO.outlineCssPx * lastDpr);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        strokeLockupGlyphs();
      } else {
        const mouseCanvasX = mouse.x * width;
        const mouseCanvasY = (1 - mouse.y) * height;
        const absLeft = centerX + left;
        const absRight = centerX + left + markWidth + gap + wordBlockWidth;
        const absTop = centerY + top;
        const stackBottom = top + 3 * wordHeight + 2 * lineGap;
        const absBottom =
          centerY +
          Math.max(markBaseline + markDescent, stackBottom + wordSize * 0.22);
        const clamp = (v: number, lo: number, hi: number) =>
          Math.max(lo, Math.min(v, hi));
        const nearestX = clamp(mouseCanvasX, absLeft, absRight);
        const nearestY = clamp(mouseCanvasY, absTop, absBottom);
        const dist = Math.hypot(mouseCanvasX - nearestX, mouseCanvasY - nearestY);
        const maxProximityDist =
          Math.max(width, height) * NEON_OUTLINE.maxProximityDistCanvasFactor;
        const proximity = Math.max(
          0,
          Math.min(1, 1 - dist / maxProximityDist),
        );
        const outlinePresence =
          proximity * proximity * (3 - 2 * proximity);

        if (outlinePresence >= NEON_OUTLINE.presenceCutoff) {
          const localMouseX = mouseCanvasX - centerX;
          const localMouseY = mouseCanvasY - centerY;
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
          const lineMin =
            NEON_OUTLINE.lineWidthMinPx +
            markSize * NEON_OUTLINE.lineWidthMinMarkFactor;
          const lineMax =
            NEON_OUTLINE.lineWidthMaxPx +
            markSize * NEON_OUTLINE.lineWidthMaxMarkFactor;
          const lo = Math.min(lineMin, lineMax);
          const hi = Math.max(lineMin, lineMax);
          ctx.lineWidth = lo + (hi - lo) * outlinePresence;
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          const blurMax = Math.max(9, markSize * 0.045);
          ctx.shadowBlur = blurMax * outlinePresence;
          ctx.shadowColor = `rgba(255, 255, 255, ${0.96 * outlinePresence})`;
          strokeLockupGlyphs();
        }
      }
    }

    ctx.restore();
  };

  /**
   * iOS Safari often reports tiny or zero getBoundingClientRect() / ResizeObserver sizes
   * while the URL bar and 100dvh animate during scroll; resizing canvases to 1×1 clears the lockup.
   */
  const MIN_CSS_PX = 48;
  let lastGoodCssW = 0;
  let lastGoodCssH = 0;
  let resizeRafId = 0;

  const applyCanvasDimensions = (cssW: number, cssH: number) => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    lastDpr = dpr;
    const width = Math.max(1, Math.floor(cssW * dpr));
    const height = Math.max(1, Math.floor(cssH * dpr));
    glCanvas.width = width;
    glCanvas.height = height;
    displayCanvas.width = width;
    displayCanvas.height = height;
    glitchSnapshot.width = width;
    glitchSnapshot.height = height;
    glx.viewport(0, 0, width, height);
    glx.uniform3f(uResolution, width, height, width / height);
    glx.clearColor(0, 0, 0, 0);

    const lockupWidthCss = lockupCanvasWidth(width) / dpr;
    const markSizeCss = lockupWidthCss * 0.33;
    const stackSizeCss = markSizeCss * 0.296;
    const gapCss = markSizeCss * 0.11;
    wrapper.style.setProperty("--glitch-mark-size", `${markSizeCss}px`);
    wrapper.style.setProperty("--glitch-stack-size", `${stackSizeCss}px`);
    wrapper.style.setProperty("--glitch-gap", `${gapCss}px`);
  };

  const resizeFromWrapperBox = () => {
    const rect = wrapper.getBoundingClientRect();
    let cssW = rect.width;
    let cssH = rect.height;

    const looksValid = cssW >= MIN_CSS_PX && cssH >= MIN_CSS_PX;
    if (looksValid) {
      lastGoodCssW = cssW;
      lastGoodCssH = cssH;
    } else if (lastGoodCssW >= MIN_CSS_PX && lastGoodCssH >= MIN_CSS_PX) {
      cssW = lastGoodCssW;
      cssH = lastGoodCssH;
    } else if (cssW < 1 || cssH < 1) {
      return;
    }

    applyCanvasDimensions(cssW, cssH);
  };

  const scheduleResize = () => {
    if (resizeRafId !== 0) {
      cancelAnimationFrame(resizeRafId);
    }
    resizeRafId = requestAnimationFrame(() => {
      resizeRafId = 0;
      resizeFromWrapperBox();
    });
  };

  resizeFromWrapperBox();
  const resizeObserver = new ResizeObserver(scheduleResize);
  resizeObserver.observe(wrapper);

  const onWindowResize = () => scheduleResize();
  window.addEventListener("resize", onWindowResize);
  window.addEventListener("orientationchange", onWindowResize);
  const visualViewport = window.visualViewport;
  const onVisualViewportChange = () => scheduleResize();
  visualViewport?.addEventListener("resize", onVisualViewportChange);
  visualViewport?.addEventListener("scroll", onVisualViewportChange);

  requestAnimationFrame(() => {
    scheduleResize();
    requestAnimationFrame(scheduleResize);
  });
  void document.fonts.ready.then(scheduleResize);

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

  let glitchActiveUntil = 0;
  let nextGlitchAt = performance.now() + 1600;
  let glitchesRemainingInCluster = HERO_GLITCH_TIMING.glitchesPerCluster();
  let glitchShiftX = 0;
  let glitchShiftY = 0;
  let glitchSlices: Array<{ y: number; h: number; dx: number }> = [];

  let mobileHoldGlitchPatternAt = 0;

  const randomBetween = (min: number, max: number) =>
    min + Math.random() * (max - min);

  const buildGlitchSlices = () => {
    const count = Math.floor(randomBetween(1, HERO_GLITCH_TIMING.maxSlices + 1));
    glitchSlices = Array.from({ length: count }, () => ({
      y: randomBetween(0.18, 0.82),
      h: randomBetween(0.035, 0.08),
      dx: randomBetween(-HERO_GLITCH_TIMING.maxShiftPx, HERO_GLITCH_TIMING.maxShiftPx),
    }));
  };

  const refreshMobileHoldGlitch = () => {
    glitchShiftX = randomBetween(
      -HERO_GLITCH_TIMING.maxShiftPx,
      HERO_GLITCH_TIMING.maxShiftPx,
    );
    glitchShiftY = randomBetween(-4, 4);
    buildGlitchSlices();
  };

  const onMobilePointerDown = (event: PointerEvent) => {
    if (!mobileHero) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const rect = wrapper.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    mouse = {
      x: Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
      y: Math.max(0, Math.min(1, 1 - (event.clientY - rect.top) / rect.height)),
    };
    pressedMobilePointers.add(event.pointerId);
    refreshMobileHoldGlitch();
    mobileHoldGlitchPatternAt = performance.now();
  };

  const onMobilePointerEnd = (event: PointerEvent) => {
    pressedMobilePointers.delete(event.pointerId);
  };

  wrapper.addEventListener("pointerdown", onMobilePointerDown);
  window.addEventListener("pointerup", onMobilePointerEnd, true);
  window.addEventListener("pointercancel", onMobilePointerEnd, true);

  let raf = 0;
  let prevFrameTime = performance.now();
  let frameCount = 0;

  const render = (now: number) => {
    const dtSec = Math.min(0.05, (now - prevFrameTime) / 1000);
    prevFrameTime = now;
    if (mobileHero && !reduceMotion) {
      phase += CONFIG.speed * MOBILE_HERO.autoplayPhasePerSecond * dtSec;
    }

    if (glx.isContextLost()) {
      raf = requestAnimationFrame(render);
      return;
    }

    glx.uniform1f(uTime, phase);
    glx.uniform2f(uMouse, mouse.x, mouse.y);
    glx.clear(glx.COLOR_BUFFER_BIT);
    glx.drawArrays(glx.TRIANGLES, 0, 3);
    glx.flush();

    displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
    drawMaskText(displayCtx, displayCanvas.width, displayCanvas.height);
    displayCtx.globalCompositeOperation = "source-in";
    displayCtx.drawImage(glCanvas, 0, 0);
    displayCtx.globalCompositeOperation = "source-over";
    drawMaskText(displayCtx, displayCanvas.width, displayCanvas.height, "#00000000", true);

    if (now >= nextGlitchAt) {
      const burstMs = randomBetween(
        HERO_GLITCH_TIMING.minBurstMs,
        HERO_GLITCH_TIMING.maxBurstMs,
      );
      glitchActiveUntil = now + burstMs;
      glitchesRemainingInCluster -= 1;
      if (glitchesRemainingInCluster > 0) {
        nextGlitchAt =
          now +
          burstMs +
          randomBetween(
            HERO_GLITCH_TIMING.minInClusterGapMs,
            HERO_GLITCH_TIMING.maxInClusterGapMs,
          );
      } else {
        glitchesRemainingInCluster = HERO_GLITCH_TIMING.glitchesPerCluster();
        nextGlitchAt =
          now +
          burstMs +
          randomBetween(
            HERO_GLITCH_TIMING.minCooldownMs,
            HERO_GLITCH_TIMING.maxCooldownMs,
          );
      }
      glitchShiftX = randomBetween(
        -HERO_GLITCH_TIMING.maxShiftPx,
        HERO_GLITCH_TIMING.maxShiftPx,
      );
      glitchShiftY = randomBetween(-4, 4);
      buildGlitchSlices();
    }

    const mobileHoldGlitch = mobileHero && pressedMobilePointers.size > 0;
    if (
      mobileHoldGlitch &&
      now - mobileHoldGlitchPatternAt >= MOBILE_HERO.holdGlitchRefreshMs
    ) {
      refreshMobileHoldGlitch();
      mobileHoldGlitchPatternAt = now;
    }

    if (now < glitchActiveUntil || mobileHoldGlitch) {
      const w = displayCanvas.width;
      const h = displayCanvas.height;

      displayCtx.globalCompositeOperation = "lighter";
      drawMaskText(displayCtx, w, h, "rgba(255, 0, 120, 0)", false, {
        offsetX: glitchShiftX * -0.45,
        offsetY: glitchShiftY * 0.35,
        strokeOnly: true,
        lineWidth: 1.2,
        strokeStyle: "rgba(255, 70, 160, 0.85)",
        shadowBlur: 0,
        shadowColor: "transparent",
      });
      drawMaskText(displayCtx, w, h, "rgba(0, 220, 255, 0)", false, {
        offsetX: glitchShiftX * 0.5,
        offsetY: glitchShiftY * -0.35,
        strokeOnly: true,
        lineWidth: 1.2,
        strokeStyle: "rgba(90, 240, 255, 0.82)",
        shadowBlur: 0,
        shadowColor: "transparent",
      });

      displayCtx.globalCompositeOperation = "source-over";
      /** Self-drawImage is unreliable when scrolling / on WebKit; copy to a snapshot first. */
      glitchSnapCtx.clearRect(0, 0, w, h);
      glitchSnapCtx.drawImage(displayCanvas, 0, 0);
      for (const slice of glitchSlices) {
        const y = h * slice.y;
        const sh = Math.max(1, h * slice.h);
        displayCtx.save();
        displayCtx.beginPath();
        displayCtx.rect(0, y, w, sh);
        displayCtx.clip();
        displayCtx.drawImage(glitchSnapshot, slice.dx, 0);
        displayCtx.restore();
      }
    }

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

  return () => {
    cancelAnimationFrame(raf);
    if (resizeRafId !== 0) {
      cancelAnimationFrame(resizeRafId);
    }
    resizeObserver.disconnect();
    visualViewport?.removeEventListener("resize", onVisualViewportChange);
    visualViewport?.removeEventListener("scroll", onVisualViewportChange);
    mqCoarse.removeEventListener("change", onMobileMq);
    mqNarrow.removeEventListener("change", onMobileMq);
    mqReduceMotion.removeEventListener("change", onReduceMotion);
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("orientationchange", onWindowResize);
    glCanvas.remove();
    wrapper.removeEventListener("pointermove", onPointerMove);
    wrapper.removeEventListener("touchmove", onTouchMove);
    wrapper.removeEventListener("pointerdown", onMobilePointerDown);
    window.removeEventListener("pointerup", onMobilePointerEnd, true);
    window.removeEventListener("pointercancel", onMobilePointerEnd, true);
  };
}
