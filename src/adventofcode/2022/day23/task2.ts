/**
 * npm run aoc 2022 23 2
 */
import { applyMoves, detectMoves, getSides, parseInput } from "./common.ts";

const isMapsEqual = (m1: Map<string, true>, m2: Map<string, true>): boolean => {
  if (m1.size !== m2.size) {
    return false;
  }

  let isEqual = true;
  for (let key of m1.keys()) {
    isEqual = isEqual && m1.get(key) === m2.get(key);
  }
  return isEqual;
};
export const task = (rows: string[]) => {
  let sides = getSides();
  let map = parseInput(rows);

  let round = 0;
  let isEqual = false;

  do {
    round += 1;
    const moves = detectMoves(map, sides);
    const newMap = applyMoves(moves);
    isEqual = isMapsEqual(map, newMap);
    map = newMap;
    const side = sides.shift();
    if (side) {
      sides = [...sides, side];
    }
  } while (!isEqual);

  return round;
};
