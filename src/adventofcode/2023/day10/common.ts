import type { FlatCoordinate } from "../../common/types.ts";

type PipeType = {
  first: FlatCoordinate;
  second: FlatCoordinate;
};

export const PIPE_TYPE: Record<string, PipeType> = {
  "|": {
    first: {
      i: 1,
      j: 0,
    },
    second: {
      i: -1,
      j: 0,
    },
  },
  "-": {
    first: {
      i: 0,
      j: 1,
    },
    second: {
      i: 0,
      j: -1,
    },
  },
  L: {
    first: {
      i: -1,
      j: 0,
    },
    second: {
      i: 0,
      j: 1,
    },
  },
  J: {
    first: {
      i: -1,
      j: 0,
    },
    second: {
      i: 0,
      j: -1,
    },
  },
  F: {
    first: {
      i: 1,
      j: 0,
    },
    second: {
      i: 0,
      j: 1,
    },
  },
  "7": {
    first: {
      i: 1,
      j: 0,
    },
    second: {
      i: 0,
      j: -1,
    },
  },
};

export const PIPE_TYPES = Object.keys(PIPE_TYPE);

export const EMPTY_GROUND = ".";

export const START_POSITION = "S";

export const getStartPosition = (pipes: string[][]): FlatCoordinate => {
  for (let i = 0; i < pipes.length; i++) {
    for (let j = 0; j < pipes[i].length; j++) {
      if (pipes[i][j] === START_POSITION) {
        return { i, j };
      }
    }
  }

  throw new Error("Start position not found");
};
