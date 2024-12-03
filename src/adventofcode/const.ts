import type { StringOrNumber } from "./types.ts";

export const CONSOLE_COLORS = {
  WHITE: "color: green",
  RED: "color: red",
  GREEN: "color: red",
  VOLT: "color: cyan",
} as const;

export const getRunCommand = (
  command: "run" | "fetch",
  day: StringOrNumber = "[day]",
  part: StringOrNumber = "[part]",
  isSample: StringOrNumber = "(sample)",
): string => {
  const res = `npm run aoc:${command} ${day} ${part}`;
  return isSample ? `${res} true` : res;
};
