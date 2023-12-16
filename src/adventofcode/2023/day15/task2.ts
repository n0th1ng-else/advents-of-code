/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2023
 * 2. Run the command: npm run aoc:run 15 2
 */
import type { TaskResult } from "../../types.ts";
import { runHashOnSequence } from "./common.ts";

type Lens = {
  label: string;
  command: string;
  focalLength: number;
  box: number;
};

const sumBox = (boxId: string, lenses: Lens[]): number => {
  const boxMultiplier = Number(boxId) + 1;
  return lenses.reduce((acc, lens, index) => {
    const focalLength = lens.focalLength;
    const lensOrder = index + 1;
    return acc + boxMultiplier * focalLength * lensOrder;
  }, 0);
};

const renderBoxes = (boxes: Record<string, Lens[]>, lens: Lens): void => {
  console.log("\n=====");
  console.log(
    `After "${lens.label}${lens.command}${
      lens.command === "-" ? "" : lens.focalLength
    }":`,
  );

  const ids = Object.keys(boxes).filter((box) => boxes[box].length);
  const rows = ids.map((id) => {
    const box = boxes[id];
    return box.reduce((acc, l) => {
      return `${acc} [${l.label} ${l.focalLength}]`;
    }, `Box ${id}:`);
  });
  console.log(rows.join("\n"));
};

const packBoxes = (lenses: Lens[]): Record<string, Lens[]> => {
  const boxes: Record<number, Lens[]> = {};
  for (let i = 0; i < lenses.length; i++) {
    const lens = { ...lenses[i] };
    if (!boxes[lens.box]) {
      boxes[lens.box] = [];
    }
    if (lens.command === "=") {
      const existingLens = boxes[lens.box].findIndex(
        (l) => l.label === lens.label,
      );
      if (existingLens !== -1) {
        boxes[lens.box] = boxes[lens.box].map((item, index) => {
          if (index === existingLens) {
            return lens;
          }
          return item;
        });
      } else {
        boxes[lens.box] = [...boxes[lens.box], lens];
      }
    } else {
      boxes[lens.box] = boxes[lens.box].filter((l) => l.label !== lens.label);
    }
    // renderBoxes(boxes, lens);
  }
  return boxes;
};

export const task = (rows: string[]): TaskResult => {
  const sequences = (rows.at(0) ?? "").split(",");
  const lenses = sequences.map((seq) => {
    const separator = seq.includes("-") ? "-" : "=";
    const [label, power] = seq.split(separator);
    return {
      label,
      command: separator,
      focalLength: power ? Number(power) : 0,
      box: runHashOnSequence(label),
    };
  });

  const results = packBoxes(lenses);
  const sumInBoxes = Object.keys(results).map((id) => {
    return sumBox(id, results[id]);
  });
  const result = sumInBoxes.reduce((acc, sum) => sum + acc, 0);

  return {
    result,
    sample: 145,
    task: 271_384,
  };
};
