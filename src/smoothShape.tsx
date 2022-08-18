
import { zip } from './arrayUtils';
import { lerpPoints, Point, roundPoint } from './point';

/**
 * Applies Chaikin smoothing to the given points a number of times, 
 * and returns a new array of points describing the smoothed shape.
 * 
 * @param pts initial Point array representing a shape to be smoothed
 * @param numTimes how many times to smooth
 * @returns new array of Point objects
 */
export function smoothShape(pts: Point[], numTimes: number) {
  for (let i = 0; i < numTimes; i++) {
    pts = smoothShapeOnce(pts);
  }
  return pts;
}

export function smoothShapeOnce(pts: Point[]) {
  const newPts = [];
  const laggedPts = [...pts.slice(1), pts[0]];
  const pairs: [Point, Point][] = zip(pts, laggedPts);

  for (let pair of pairs) {
    const a = lerpPoints(pair[0], pair[1], 0.25);
    const b = lerpPoints(pair[0], pair[1], 0.75);
    newPts.push(roundPoint(a), roundPoint(b));
  }
  return newPts;
}
