export const parseInput = (rows: string[]): Map<number, number> =>
  rows.reduce<Map<number, number>>((acc, row) => {
    const items = row ? row.split(",").map((item) => Number(item)) : [];
    items.forEach((item) => {
      const curr = acc.get(item) ?? 0;
      acc.set(item, curr + 1);
    });

    return acc;
  }, new Map<number, number>());

const CYCLE = 9;
const DAYS_IN_CYCLE = new Array(CYCLE).fill(0).map((_, i) => i);

export const applyDay = (map: Map<number, number>): void => {
  DAYS_IN_CYCLE.forEach((day) => {
    const curr = map.get(day) ?? 0;
    map.set(day - 1, curr);
    map.set(day, 0);
  });

  const curr = map.get(-1) ?? 0;
  map.set(8, (map.get(8) ?? 0) + curr);
  map.set(6, (map.get(6) ?? 0) + curr);
  map.delete(-1);
};

export const renderFish = (map: Map<number, number>): void => {
  map.forEach((value, key) => {
    new Array(value).fill(0).forEach(() => console.log(key));
  });
};
