
import { Point} from './point';

/**
 * Applies Chaikin smoothing to the given points a number of times, 
 * and returns a new array of points describing the smoothed shape.
 * 
 * @param pts initial Point array representing a shape to be smoothed
 * @param numTimes how many times to smooth
 * @returns new array of Point objects
 */
export function smoothShape(pts: Point[], numTimes: number) {
  let outputPts: Point[] = [...pts];
  for (let i = 0; i < numTimes; i++) {
    outputPts = smoothShapeOnce(outputPts);
  }
  return outputPts;
}

//Return a new array of points, where for each original pair of points, two new points are added - 
// one being 1/4 of the way between the pair and the other being 3/4 of the way between the pair.
export function smoothShapeOnce(pts: Point[]): Point[] {
  let outputPts: Point[] = [];
  let ptPairs = createPtPairs(pts);
  for (const pair of ptPairs) {
      const pointB: Point = createPtBetween(pair[0], pair[1], 1/4);
      const pointC: Point = createPtBetween(pair[0], pair[1], 3/4);
      outputPts.push(pointB, pointC);
  }
  return outputPts;
}

function createPtPairs(pts: Point[]): Point[][] {
  const ptPairs: Point[][] = [[pts[pts.length - 1], pts[0]]];
  for (let i = 0; i < pts.length - 1; i++) {
      ptPairs.push([pts[i], pts[i + 1]])
  }
  return ptPairs;
}

function createPtBetween(pointA: Point, pointD: Point, fraction: number): Point {
  let xBetween: number = pointA.x + fraction * (pointD.x - pointA.x);
  let yBetween: number = pointA.y + fraction * (pointD.y - pointA.y)
  return {x: xBetween, y: yBetween};
}
