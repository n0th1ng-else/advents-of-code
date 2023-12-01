/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day5/task1.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import {
  calculateBadPlaces,
  getStraightLines,
  parseInput,
  updateMapStraightLines,
} from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const task = () => {
  const parsed = parseInput(rows);
  const items = getStraightLines(parsed);
  const map = items.reduce<Record<string, number>>(
    (acc, { start, end }) => updateMapStraightLines(acc, start, end),
    {},
  );

  return calculateBadPlaces(map);
};

execWithTime(task, thisFile);
