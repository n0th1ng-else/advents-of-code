/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 2 1
 */
import type { TaskResult } from "../../types.ts";
import { getReports, isReportSafe } from "./common.ts";

export const task = (rows: string[]): TaskResult => {
  const reports = getReports(rows);

  const count = reports.reduce((acc, report) => {
    const isSafe = isReportSafe(report);
    return isSafe ? acc + 1 : acc;
  }, 0);

  return {
    result: count,
    sample: 2,
    task: 631,
  };
};
