/**
 * npm run aoc 2022 3 1
 */
import { execWithTime, readFileByPath } from "../../common.ts";
import { getCharVolume } from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const input = await readFileByPath(thisFile);

const detectChar = (row: string): string => {
  const half = Math.floor(row.length / 2);
  const right = row.slice(half);

  for (let i = 0; i < half; i++) {
    const char = row[i];
    if (right.includes(char)) {
      return char;
    }
  }

  throw new Error("Wrong input");
};
const task = (rows: string[]) => {
  const chars = rows.map((row) => detectChar(row));
  return chars.reduce((sum, char) => sum + getCharVolume(char), 0);
};

execWithTime(() => task(input), thisFile);
