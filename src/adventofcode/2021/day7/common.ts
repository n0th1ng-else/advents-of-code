export const parseInput = (lines: string[]): number[] =>
  lines.reduce<number[]>((acc, line) => {
    if (!line) {
      return acc;
    }
    const items = line.split(",").map((item) => Number(item));
    return [...acc, ...items];
  }, []);

export const getFuel = (
  crabs: number[],
  getStepFuel: (start: number, end: number) => number
): number => {
  const sorted = crabs.sort((a, b) => (a > b ? 1 : -1));
  const diff = sorted[sorted.length - 1] - sorted[0];
  const iterator = new Array(diff).fill(0).map((_, i) => i + sorted[0]);
  return iterator.reduce((acc, point) => {
    const s = sorted.reduce((acc, p) => acc + getStepFuel(point, p), 0);
    return !acc || s <= acc ? s : acc;
  }, 0);
};
