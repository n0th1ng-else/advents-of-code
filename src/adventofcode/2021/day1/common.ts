type Trend = "up" | "down" | "stay";

const comparator = (
  lines: string[],
  start: number,
  getWindow: (lines: string[], start: number) => number | null
): Trend => {
  const left = getWindow(lines, start);
  const right = getWindow(lines, start + 1);
  if (left === right || right === null || left === null) {
    return "stay";
  }
  if (left > right) {
    return "up";
  }
  return "down";
};

export const getResult = (
  lines: string[],
  getWindow: (input: string[], state: number) => number | null
): number => {
  const res = lines.reduce<{
    ups: number;
    downs: number;
  }>(
    (acc, _, ind) => {
      const compared = comparator(lines, ind, getWindow);

      return {
        ups: acc.ups + (compared === "up" ? 1 : 0),
        downs: acc.downs + (compared === "down" ? 1 : 0),
      };
    },
    {
      ups: 0,
      downs: 0,
    }
  );

  return res.downs;
};
