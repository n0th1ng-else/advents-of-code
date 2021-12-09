/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day9/task1.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { parseInput } from "./common.ts";

const day: TaskId = 9;
const part: PartId = 1;
const example = false;
const rows = await readFile(day, example);

const shouldAdd = (
  items: number[][],
  ind: number,
  jnd: number,
  height: number
): boolean => {
  return (
    [-1, 1].every((iOffset) => {
      const row = items[ind + iOffset] || [];
      const num = row[jnd] ?? 10;
      return num > height;
    }) &&
    [-1, 1].every((jOffset) => {
      const row = items[ind] || [];
      const num = row[jnd + jOffset] ?? 10;
      return num > height;
    })
  );
};

const runTask = (items: number[][]): number =>
  items.reduce((sum, item, ind) => {
    const rowSum = item.reduce(
      (rSum, height, jnd) =>
        shouldAdd(items, ind, jnd, height) ? rSum + height + 1 : rSum,
      0
    );

    return sum + rowSum;
  }, 0);

const task = () => {
  const map = parseInput(rows);
  return runTask(map);
};

withTime(task, day, part);
