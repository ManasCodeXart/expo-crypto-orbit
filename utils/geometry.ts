export interface Point {
  readonly x: number
  readonly y: number
}

/**
 * Returns the index of the first point within `radius` of `touch`, treating
 * each point as relative to `origin`. Returns -1 when nothing is hit.
 *
 * Pure math, no React Native dependencies — safe to call from the JS thread
 * or from a Reanimated worklet.
 */
export function findNearestPointIndex(
  points: readonly Point[],
  origin: Point,
  touch: Point,
  radius: number
): number {
  'worklet'
  for (let i = 0; i < points.length; i++) {
    const dx = touch.x - (origin.x + points[i].x)
    const dy = touch.y - (origin.y + points[i].y)
    if (Math.hypot(dx, dy) < radius) return i
  }
  return -1
}