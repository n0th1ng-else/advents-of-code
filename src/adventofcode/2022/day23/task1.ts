/**
 * npm run aoc 2022 23 1
 */
import {
  applyMoves,
  detectMoves,
  getSides,
  parseId,
  parseInput,
} from "./common.ts";

const ROUNDS = 10;

export const task = (rows: string[]) => {
  let sides = getSides();
  let map = parseInput(rows);

  for (let i = 0; i < ROUNDS; i++) {
    const moves = detectMoves(map, sides);
    map = applyMoves(moves);
    const side = sides.shift();
    if (side) {
      sides = [...sides, side];
    }
  }

  const x: number[] = [];
  const y: number[] = [];
  for (let keyId of map.keys()) {
    const key = parseId(keyId);
    x.push(key[0]);
    y.push(key[1]);
  }
  const sortedX = x.sort((a, b) => (a > b ? 1 : -1));
  const sortedY = y.sort((a, b) => (a > b ? 1 : -1));
  const lengthX = sortedX[x.length - 1] - sortedX[0] + 1;
  const lengthY = sortedY[y.length - 1] - sortedY[0] + 1;

  return lengthX * lengthY - map.size;
};
