/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 7 2
 */
import type { TaskResult } from "../../types.ts";

const OPERATIONS = ["+", "*", "||"] as const;

type OperationType = (typeof OPERATIONS)[number];

const getExpressionOptions = (
  item: { total: number; items: number[] },
  operators: Array<OperationType> = [],
): number => {
  if (item.items.length - 1 === operators.length) {
    const current = operators.reduce<number>((sum, op, index) => {
      if (op === "+") {
        return sum + item.items[index + 1];
      }
      if (op === "*") {
        return sum * item.items[index + 1];
      }
      if (op === "||") {
        return Number(`${sum}${item.items[index + 1]}`);
      }
      throw new Error("not supported");
    }, item.items[0]);
    return current === item.total ? 1 : 0;
  }

  return OPERATIONS.reduce((res, op) => {
    return res + getExpressionOptions(item, [...operators, op]);
  }, 0);
};

export const task = (rows: string[]): TaskResult => {
  const parsed = rows.map((row) => {
    const [left, right] = row.split(":");
    const total = Number(left.trim());
    return {
      total,
      items: right
        .split(" ")
        .filter(Boolean)
        .map((i) => Number(i.trim())),
    };
  });
  const res = parsed
    .filter((row) => {
      const options = getExpressionOptions(row);
      return Boolean(options);
    })
    .reduce((sum, i) => sum + i.total, 0);

  return {
    result: res,
    sample: 11_387,
    task: 509_463_489_296_712,
  };
};
