/**
 * npm run aoc 2022 10 1
 */

export const task = (rows: string[]) => {
  const interval = 40;
  const start = 20;
  let sum = 0;
  let current = 0;
  let x = 1;

  for (let i = 0; i < rows.length; i++) {
    const row = rows.at(i);
    if (!row) {
      break;
    }
    const parts = row.split(" ");

    const addx = parts[0] === "addx";

    current += 1;
    if (!((current - start) % interval)) {
      sum = sum + current * x;
    }

    if (addx) {
      current += 1;

      if (!((current - start) % interval)) {
        sum = sum + current * x;
      }
      x += Number(parts[1]);
    }
  }

  return sum;
};
