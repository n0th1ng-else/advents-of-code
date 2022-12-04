/**
 * npm run aoc 2022 4 2
 */
import { execWithTime, readFileByPath } from "../../common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const input = await readFileByPath(thisFile, false);

const task = (rows: string[]) => {
  return rows.reduce((count, row) => {
    const [left, right] = row.split(",");
    const l = left.split("-");
    const r = right.split("-");
    const [l1, l2] = l.map((item) => Number(item));
    const [r1, r2] = r.map((item) => Number(item));
    const clean = r1 > l2 || l1 > r2;
    return !clean ? count + 1 : count;
  }, 0);
};

execWithTime(() => task(input), thisFile);
