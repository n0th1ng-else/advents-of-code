export type CoordinatePair = {
  i: number;
  j: number;
};

export const ARRAY_OFFSETS_AROUND: CoordinatePair[] = [
  {
    i: -1,
    j: -1,
  },
  {
    i: -1,
    j: 0,
  },
  {
    i: -1,
    j: 1,
  },
  {
    i: 0,
    j: -1,
  },
  {
    i: 0,
    j: 1,
  },
  {
    i: 1,
    j: -1,
  },
  {
    i: 1,
    j: 0,
  },
  {
    i: 1,
    j: 1,
  },
];

export const isNum = (char: string): boolean => {
  return !isNaN(Number(char));
};
