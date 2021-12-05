/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day5/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import {
  calculateBadPlaces,
  getStraightLines,
  parseInput,
  updateMapStraightLines,
} from "./common.ts";

const day: TaskId = 5;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const task = () => {
  const parsed = parseInput(rows);
  const items = getStraightLines(parsed);
  const map = items.reduce<Record<string, number>>(
    (acc, { start, end }) => updateMapStraightLines(acc, start, end),
    {}
  );

  return calculateBadPlaces(map);
};

withTime(task, day, part);
