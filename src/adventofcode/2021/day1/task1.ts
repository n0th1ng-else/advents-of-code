/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day1/task1.ts
 */
import { getResult } from "./common.ts";
import { readFileByPath, execWithTime } from "../../common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const getWindow = (lines: string[], start: number): number =>
  Number(lines[start] ?? 0);

const task = () => getResult(rows, getWindow);

execWithTime(task, thisFile);
