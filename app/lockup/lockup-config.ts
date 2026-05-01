/** Mouse motion → liquid chrome phase (shader time) */
export const INTERACTION_TIMING = {
  phaseGainPerMove: 3.5,
  maxPointerStepPerFrame: 0.03,
} as const;

/** Glitch bursts on the lockup (canvas compositing) */
export const HERO_GLITCH_TIMING = {
  glitchesPerCluster: () => Math.floor(Math.random() * 3) + 1,
  minInClusterGapMs: 5,
  maxInClusterGapMs: 5,
  minCooldownMs: 1800,
  maxCooldownMs: 3600,
  minBurstMs: 130,
  maxBurstMs: 260,
  maxShiftPx: 8,
  maxSlices: 5,
} as const;

/** Canvas lockup: smaller scale = smaller STW + wordmark together */
export const LOCKUP_SIZE = {
  widthFraction: 0.9,
  maxCanvasPx: 1080,
  scale: 0.72,
} as const;

/**
 * Neon outline stroke (canvas pixels). Final width lerps by pointer proximity.
 */
export const NEON_OUTLINE = {
  lineWidthMinPx: 0,
  lineWidthMaxPx: 1.1,
  lineWidthMinMarkFactor: 0,
  lineWidthMaxMarkFactor: 0.0011,
  presenceCutoff: 0.004,
  maxProximityDistCanvasFactor: 0.42,
} as const;

/** WebGL liquid-chrome shader */
export const LIQUID_CHROME_SHADER = {
  baseColor: [0.1, 0.1, 0.1] as [number, number, number],
  speed: 1,
  amplitude: 0.6,
  frequencyX: 3,
  frequencyY: 3,
  interactive: true,
} as const;
