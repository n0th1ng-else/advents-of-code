/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day5/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import {
  calculateBadPlaces,
  getId,
  getStraightLines,
  isLineStraight,
  parseInput,
  updateMapStraightLines,
  VetCoordinate,
  VetLine,
} from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const getDiagonalLines = (items: VetLine[]): VetLine[] =>
  items.filter((line) => !isLineStraight(line));

const updateMapDiagonalLines = (
  map: Record<string, number>,
  start: VetCoordinate,
  end: VetCoordinate,
): Record<string, number> => {
  const xDirection = end.x > start.x;
  const yDirection = end.y > start.y;
  const range = Math.abs(start.x - end.x);

  const coordinates: VetCoordinate[] = new Array(range + 1)
    .fill(0)
    .map((_, i) => ({
      x: xDirection ? start.x + i : start.x - i,
      y: yDirection ? start.y + i : start.y - i,
    }));

  return coordinates.reduce((acc, { x, y }) => {
    const id = getId(x, y);
    acc[id] = acc[id] ? acc[id] + 1 : 1;
    return acc;
  }, map);
};

const task = () => {
  const parsed = parseInput(rows);
  const items = getStraightLines(parsed);
  const map = items.reduce<Record<string, number>>(
    (acc, { start, end }) => updateMapStraightLines(acc, start, end),
    {},
  );
  const diagonals = getDiagonalLines(parsed);

  const fullMap = diagonals.reduce<Record<string, number>>(
    (acc, { start, end }) => updateMapDiagonalLines(acc, start, end),
    map,
  );

  return calculateBadPlaces(fullMap);
};

execWithTime(task, thisFile);
