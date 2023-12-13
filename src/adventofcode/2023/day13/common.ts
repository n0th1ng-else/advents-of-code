import { transponMatrix } from "../../common/utils.ts";

export const getReflectionPatternGroups = (rows: string[]): string[][] => {
  const patterns: string[][] = [];
  let pattern: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    if (!rows[i]) {
      patterns.push(pattern);
      pattern = [];
    } else {
      pattern.push(rows[i]);
    }
  }
  if (pattern.length) {
    patterns.push(pattern);
  }
  return patterns;
};

const findRowReflectionIds = (pattern: string[]): number[] => {
  const ids: number[] = [];
  for (let i = 1; i < pattern.length; i++) {
    const loop = Math.min(i, pattern.length - i);

    let same = true;
    for (let j = 0; j < loop; j++) {
      const leftId = i - j - 1;
      const rightId = i + j;
      same = same && pattern[leftId] === pattern[rightId];
    }

    if (same) {
      ids.push(i);
    }
  }

  return ids;
};

const findColumnReflectionIds = (pattern: string[]): number[] => {
  const transformed = transponMatrix<string>(
    pattern.map((i) => i.split("")),
  ).map((i) => i.join(""));
  return findRowReflectionIds(transformed);
};

export enum ReflectionDirection {
  Row = "row",
  Column = "column",
}

export type ReflectionPlace = {
  id: number;
  type: ReflectionDirection;
};

export const findReflections = (
  pattern: string[],
): { rowIds: number[]; columnIds: number[] } => {
  const rowIds = findRowReflectionIds(pattern);
  const columnIds = findColumnReflectionIds(pattern);

  const hasResults = rowIds.length || columnIds.length;
  if (!hasResults) {
    throw new Error("no result!");
  }

  return {
    rowIds,
    columnIds,
  };
};

export const countReflections = (reflections: ReflectionPlace[]): number => {
  const result = reflections.reduce((acc, { id, type }) => {
    const adder = type === ReflectionDirection.Column ? id : 100 * id;
    return acc + adder;
  }, 0);
  return result;
};
