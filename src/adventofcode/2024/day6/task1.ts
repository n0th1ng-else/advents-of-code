/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 6 1
 */
import type { TaskResult } from "../../types.ts";
import type { FlatCoordinate } from "../../common/types.ts";

const START_CHAR = "^";

const CLOSED_CHAR = "#";

const prepareLabyrinth = (rows: string[]): { start: FlatCoordinate } => {
  let start: FlatCoordinate = {
    i: 0,
    j: 0,
  };
  for (let i = 0; i < rows.length; i++) {
    const elements = rows[i];
    for (let j = 0; j < elements.length; j++) {
      if (START_CHAR === elements[j]) {
        start = {
          i,
          j,
        };
      }
    }
  }
  return {
    start,
  };
};

const changeDirection = (direciton: FlatCoordinate): FlatCoordinate => {
  const id = `${direciton.i}:${direciton.j}`;
  switch (id) {
    case `-1:0`:
      return { i: 0, j: 1 };
    case "0:1":
      return { i: 1, j: 0 };
    case "1:0":
      return { i: 0, j: -1 };
    case "0:-1":
      return { i: -1, j: 0 };
    default:
      throw new Error(`Unknown direction: ${direciton}`);
  }
};

export const task = (rows: string[]): TaskResult => {
  const { start } = prepareLabyrinth(rows);
  const visited = new Set<string>();
  visited.add(`${start.i}:${start.j}`);
  let direction: FlatCoordinate = {
    i: -1,
    j: 0,
  };

  let currentPosition: FlatCoordinate = start;
  let nextValue = ".";
  do {
    const nextPosition = {
      i: currentPosition.i + direction.i,
      j: currentPosition.j + direction.j,
    };
    nextValue = rows[nextPosition.i]?.[nextPosition.j];
    if (nextValue) {
      if (nextValue === CLOSED_CHAR) {
        direction = changeDirection(direction);
      } else {
        visited.add(`${nextPosition.i}:${nextPosition.j}`);
        currentPosition = { ...nextPosition };
      }
    }
  } while (nextValue);
  console.log(visited.size);
  return {
    result: visited.size,
    sample: 41,
    task: 4_758,
  };
};
