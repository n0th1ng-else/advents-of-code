/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day10/task2.ts
 */
import { readFileByPath, execWithTime } from "../../common.ts";
import {
  getClosingChar,
  getOpeningChar,
  getOpeningCharScore,
} from "./common.ts";

const thisFile = new URL("", import.meta.url).pathname;
const rows = await readFileByPath(thisFile);

const getCompletionList = (row: string): string[] => {
  try {
    return row.split("").reduce<string[]>((stack, char) => {
      const opening = getOpeningChar(char);
      if (opening) {
        const last = stack.pop();
        if (last === opening) {
          return stack;
        }
        throw new Error("incorrect");
      }

      return [...stack, char];
    }, []);
  } catch (err) {
    return [];
  }
};

const getScore = (list: string[]): number => {
  return list.reverse().reduce((score, char) => {
    const closing = getClosingChar(char);
    if (!closing) {
      throw new Error("incorrect");
    }
    return score * 5 + getOpeningCharScore(closing);
  }, 0);
};

const task = () => {
  const s = rows
    .map((row) => getCompletionList(row))
    .filter((list) => list.length)
    .map((list) => getScore(list))
    .sort((a, b) => a - b);

  return s[Math.floor(s.length / 2)];
};

execWithTime(task, thisFile);
