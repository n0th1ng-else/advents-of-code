/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 3 2
 */
import type { TaskResult } from "../../types.ts";
import { multiplyFromString, scanCommands } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const row = rows.join();

  const multiplyIndexes = scanCommands(row);
  const doIndexes = scanCommands(row, new RegExp("do\\(\\)", "g")).map(
    (item) => item.index,
  );
  const dontIndexes = scanCommands(row, new RegExp("don't\\(\\)", "g")).map(
    (item) => item.index,
  );
  const legit = multiplyIndexes.reduce((acc, item) => {
    const startIndex = item.index;
    let shouldAdd = true;
    for (let i = startIndex; i > -1; i--) {
      if (dontIndexes.includes(i)) {
        shouldAdd = false;
      }
      if (doIndexes.includes(i)) {
        break;
      }
    }

    if (shouldAdd) {
      acc.push(item);
    }
    return acc;
  }, new Array<RegExpExecArray>());
  const mult = legit.map((item) => {
    return multiplyFromString(item[1], item[2]);
  });
  const sum = mult.reduce((acc, cur) => acc + cur, 0);

  return {
    result: sum,
    sample: 48,
    task: 92_626_942,
  };
};
