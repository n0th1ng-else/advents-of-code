/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 4 2
 */
import type { TaskResult } from "../../types.ts";
import { findLetter } from "./common.ts";

const CENTER_LETTER = "A";
const LETTERS = ["M", "S"];

const hasX = (
  arr: string[][],
  i: number,
  j: number,
  letters: string[],
): boolean => {
  let lettersArr = [...letters];
  return [-1, 1].every((offset) => {
    const letter = arr[i + offset]?.[j + offset];
    const hasLetter = lettersArr.includes(letter);
    lettersArr = lettersArr.filter((l) => l !== letter);
    return hasLetter;
  });
};

const hasXReverse = (
  arr: string[][],
  i: number,
  j: number,
  letters: string[],
): boolean => {
  let lettersArr = [...letters];
  return [-1, 1].every((offset) => {
    const letter = arr[i + offset]?.[j - offset];
    const hasLetter = lettersArr.includes(letter);
    lettersArr = lettersArr.filter((l) => l !== letter);
    return hasLetter;
  });
};

const findX = (
  arr: string[][],
  i: number,
  j: number,
  letters: string[],
): number => {
  if (hasX(arr, i, j, letters) && hasXReverse(arr, i, j, letters)) {
    return 1;
  }
  return 0;
};

export const task = (rows: string[]): TaskResult => {
  const arr = rows.map((row) => row.split(""));
  const lettersArr = [...LETTERS];
  const centerletter = CENTER_LETTER;
  const positions = findLetter(centerletter, arr);
  const groups = [...positions].map(({ i, j }) => findX(arr, i, j, lettersArr));

  return {
    result: groups.reduce((acc, i) => acc + i),
    sample: 9,
    task: 2011,
  };
};
