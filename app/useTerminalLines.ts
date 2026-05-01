import { useEffect, useState } from "react";

const TERMINAL_BOOT_LINES = [
  "$ connect --region sacramento",
  "[ok] session established: sac-history",
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
  commandStartDelayMs: 8_000,
  statusLineDelayAfterCommandMs: 900,
  typingIntervalMs: 50,
  firstFactDelayMs: 45_000,
  factIntervalMs: 10_000,
} as const;

export function useTerminalLines() {
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
      if (!line) {
        onDone?.();
        return;
      }
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

  return { terminalLines, typingLine };
}
