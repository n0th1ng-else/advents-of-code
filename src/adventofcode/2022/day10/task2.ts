/**
 * npm run aoc 2022 10 2
 */

export const task = (rows: string[]) => {
  const interval = 40;
  let current = 0;
  let x = 1;
  let lcd = "\n";

  for (let i = 0; i < rows.length; i++) {
    const row = rows.at(i);
    if (!row) {
      break;
    }
    const parts = row.split(" ");

    const addx = parts[0] === "addx";

    current += 1;
    const isDrawn = [x + 2, x, x + 1].includes(current % interval);
    lcd = `${lcd}${isDrawn ? "#" : "."}`;

    if (!(current % interval)) {
      lcd = `${lcd}\n`;
    }

    if (addx) {
      current += 1;
      const isDrawn = [x + 2, x, x + 1].includes(current % interval);
      lcd = `${lcd}${isDrawn ? "#" : "."}`;

      if (!(current % interval)) {
        lcd = `${lcd}\n`;
      }
      x += Number(parts[1]);
    }
  }

  return lcd;
  // ELPLZGZL
};
