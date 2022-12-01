/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day1/task2.ts
 */
import { getResult } from "./common.ts";
import { readFileByPath, execWithTime } from "../../common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const getWindow = (lines: string[], start: number): number | null => {
  const size = lines.length;
  const end = start + 3;
  const isBigger = size < end;
  if (isBigger) {
    return null;
  }
  const items = lines.slice(start, end);
  return items.reduce((res, item) => res + Number(item), 0);
};

const task = () => getResult(rows, getWindow);

execWithTime(task, thisFile);
