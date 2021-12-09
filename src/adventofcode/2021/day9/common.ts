export const parseInput = (rows: string[]): number[][] =>
  rows.filter((row) => row).map((row) => row.split("").map(Number));
