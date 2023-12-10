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

export const EMPTY_GROUND = ".";

export const START_POSITION = "S";
