/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 4 1
 */
import type { TaskResult } from "../../types.ts";
import { findLetter } from "./common.ts";

const LETTERS = ["X", "M", "A", "S"];

const findWordInDirection = (
  arr: string[][],
  startI: number,
  startJ: number,
  dirI: number,
  dirJ: number,
  letters: string[],
): number => {
  if (!letters.length) {
    return 1;
  }

  const wordsArr = [...letters];
  const letter = wordsArr.shift() || "";
  const arrLetter = arr[startI + dirI]?.[startJ + dirJ];

  if (arrLetter === letter) {
    return findWordInDirection(
      arr,
      startI + dirI,
      startJ + dirJ,
      dirI,
      dirJ,
      wordsArr,
    );
  }

  return 0;
};

const findWord = (
  arr: string[][],
  startI: number,
  startJ: number,
  letters: string[],
  current: string[] = [],
): number => {
  const item = `${startI}:${startJ}:${arr[startI][startJ]}`;
  if (!letters.length) {
    console.log([...current, item]);
    return 1;
  }

  const wordsArr = [...letters];
  const letter = wordsArr.shift() || "";

  let result = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = arr[startI + i] || [];
      if (row[startJ + j] === letter) {
        result =
          result +
          findWordInDirection(arr, startI + i, startJ + j, i, j, wordsArr);
      }
    }
  }
  return result;
};

export const task = (rows: string[]): TaskResult => {
  const arr = rows.map((row) => row.split(""));
  const lettersArr = [...LETTERS];
  const startLetter = lettersArr.shift() || "";
  const positions = findLetter(startLetter, arr);
  const groups = [...positions].map(({ i, j }) =>
    findWord(arr, i, j, lettersArr),
  );

  return {
    result: groups.reduce((acc, i) => acc + i),
    sample: 18,
    task: 2618,
  };
};
