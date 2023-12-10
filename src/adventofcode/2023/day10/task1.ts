/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 10 1
 */
import type { TaskResult } from "../../types.ts";
import type { FlatCoordinate } from "../../common/types.ts";
import {
  EMPTY_GROUND,
  getStartPosition,
  PIPE_TYPE,
  PIPE_TYPES,
} from "./common.ts";

const isSamePosition = (
  first: FlatCoordinate,
  second: FlatCoordinate,
): boolean => {
  return first.i === second.i && first.j === second.j;
};

const findLoopLength = (
  pipes: string[][],
  startPosition: FlatCoordinate,
  currentPosition: FlatCoordinate,
  prevPosition: FlatCoordinate,
  startPipe: string,
  length = 0,
): number => {
  console.log(currentPosition, startPipe);
  const isStartPosition = isSamePosition(startPosition, currentPosition);
  if (isStartPosition && length > 0) {
    return length;
  }
  if (currentPosition.i < 0 || currentPosition.j < 0) {
    return 0;
  }
  if (
    currentPosition.i > pipes.length - 1 ||
    currentPosition.j > pipes[0].length - 1
  ) {
    return 0;
  }

  const pipeType = isStartPosition
    ? startPipe
    : pipes[currentPosition.i][currentPosition.j];
  if (pipeType === EMPTY_GROUND) {
    return 0;
  }

  const firstNext = {
    i: currentPosition.i + PIPE_TYPE[pipeType].first.i,
    j: currentPosition.j + PIPE_TYPE[pipeType].first.j,
  };
  const secondNext = {
    i: currentPosition.i + PIPE_TYPE[pipeType].second.i,
    j: currentPosition.j + PIPE_TYPE[pipeType].second.j,
  };
  const wasSameSecondPosition = isSamePosition(secondNext, prevPosition);

  return wasSameSecondPosition
    ? findLoopLength(
        pipes,
        startPosition,
        firstNext,
        currentPosition,
        startPipe,
        length + 1,
      )
    : findLoopLength(
        pipes,
        startPosition,
        secondNext,
        currentPosition,
        startPipe,
        length + 1,
      );
};

export const task = (rows: string[]): TaskResult => {
  const pipes = rows.map((row) => row.split(""));
  const startPosition = getStartPosition(pipes);
  const lengths = PIPE_TYPES.map((pipeType) =>
    findLoopLength(
      pipes,
      startPosition,
      startPosition,
      startPosition,
      pipeType,
    ),
  );
  const result = lengths.filter(Boolean).at(0) ?? 0;

  return {
    result: result / 2,
    sample: 8,
    task: 0,
  };
};
