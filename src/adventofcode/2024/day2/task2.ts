/**
 * In order to run the task solution:
 * 1. Set the year in the .env file: AOC_YEAR=2024
 * 2. Run the command: npm run aoc:run 2 2
 */
import type { TaskResult } from "../../types.ts";
import { getReports, isReportSafe } from "./common.ts";

// const isItemsAligned = (a: number, b: number): boolean => {
//   const step = b - a;
//   if (step <= 0) {
//     return false;
//   }
//
//   if (step > 3) {
//     return false;
//   }
//
//   return true;
// }
//
// const isReportSafe = (report: number[], failed = false): boolean => {
//   // let missedIndex = -1;
//   // let offset = 0;
//   // ascending
//   for (let i = 0; i < report.length - 1; i++) {
//     for (let j = 0; j < report.length; j++) {}
//     // const ind = i - offset;
//     // const start = ind;
//     // const end = i + 1;
//     // console.log(report, report[start], report[end])
//     // let isAligned = isItemsAligned(report[start], report[end]);
//     //
//     // if (!isAligned) {
//     //   if (missedIndex !== -1) {
//     //     return false
//     //   }
//     //   offset = 1;
//     //   missedIndex = ind
//     // }
//     const start = i;
//     const end = i + 1
//     console.log(report, report[start], report[end])
//     let isAligned = isItemsAligned(report[start], report[end]);
//     if (!isAligned) {
//       if (!failed) {
//         const lcopy = [...report]
//         lcopy.splice(start, 1)
//         const rcopy = [...report]
//         rcopy.splice(end, 1)
//         return isReportSafe(lcopy, true) || isReportSafe(rcopy, true)
//       } else {
//         return false
//       }
//     }
//   }
//   // console.log(report, missedIndex)
//   return true;
// };

const isSafe = (report: number[]): boolean => {
  if (isReportSafe(report)) {
    return true;
  }
  return report.some((_, ind) => {
    const arr = [...report];
    arr.splice(ind, 1);
    return isReportSafe(arr);
  });
};

export const task = (rows: string[]): TaskResult => {
  const reports = getReports(rows);

  const count = reports.reduce((acc, report) => {
    const safe = isSafe(report);
    return safe ? acc + 1 : acc;
  }, 0);

  return {
    result: count,
    sample: 4,
    task: 665,
  };
};
