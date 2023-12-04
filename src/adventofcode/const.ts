import type { StringOrNumber } from "./types.ts";

export const CONSOLE_COLORS = {
  WHITE: "color: #fff",
  RED: "color: #f00",
  GREEN: "color: #0f0",
  VOLT: "color: #bada55",
} as const;

export const getRunCommand = (
  day: StringOrNumber = "[day]",
  part: StringOrNumber = "[part]",
  isSample: StringOrNumber = "(sample)",
): string => {
  const res = `npm run aoc:run ${day} ${part}`;
  return isSample ? `${res} true` : res;
};
