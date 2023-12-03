/**
 * npm run aoc 2023 3 2
 */
import { ARRAY_OFFSETS_AROUND, CoordinatePair, isNum } from "./common.ts";

const gearsAttachedToChar = (
  rows: string[],
  i: number,
  j: number,
): CoordinatePair[] => {
  return ARRAY_OFFSETS_AROUND.filter((offset) => {
    const offsetVal = rows[i + offset.i]?.[j + offset.j] ?? "";
    return offsetVal === "*";
  }).map((offset) => {
    return {
      i: offset.i + i,
      j: offset.j + j,
    };
  });
};

export const task = (rows: string[]) => {
  const serialNumbers: {
    serial: string;
    gear: CoordinatePair;
  }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const line = rows.at(i)?.split("") ?? [];
    let bufferNum = "";
    let bufferGears: CoordinatePair[] = [];

    for (let j = 0; j < line.length; j++) {
      const char = line.at(j) ?? "";
      const isDigit = isNum(char);
      if (isDigit) {
        bufferNum = `${bufferNum}${char}`;
        bufferGears = [...bufferGears, ...gearsAttachedToChar(rows, i, j)];
      } else {
        if (bufferNum && bufferGears.length) {
          bufferGears.forEach((gear) => {
            serialNumbers.push({
              serial: bufferNum,
              gear,
            });
          });
        }
        bufferNum = "";
        bufferGears = [];
      }
    }

    if (bufferNum && bufferGears.length) {
      bufferGears.forEach((gear) => {
        serialNumbers.push({
          serial: bufferNum,
          gear,
        });
      });
    }
    bufferNum = "";
    bufferGears = [];
  }

  const inverted = serialNumbers.reduce<Record<string, Set<number>>>(
    (acc, cur) => {
      const key = `${cur.gear.i}:${cur.gear.j}`;
      if (acc[key]) {
        acc[key].add(Number(cur.serial));
      } else {
        acc[key] = new Set([Number(cur.serial)]);
      }
      return acc;
    },
    {},
  );

  const realGears = Object.values(inverted)
    .filter((gear) => gear.size === 2)
    .map((gear) => {
      const arr = Array.from(gear);
      return arr[0] * arr[1];
    });

  return realGears.reduce((acc, cur) => acc + Number(cur), 0);
};
