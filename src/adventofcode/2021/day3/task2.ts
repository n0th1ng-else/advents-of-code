/**
 * deno run -A --allow-hrtime ./src/adventofcode/2021/day3/task2.ts
 */
import { PartId, readFile, TaskId, withTime } from "../../common.ts";
import { getZeroCountAt, toNumber } from "./common.ts";

const day: TaskId = 3;
const part: PartId = 2;
const rows = await readFile(day);

const getOxygenRateAt = (rows: string[], at: number) => {
  const zeroCount = getZeroCountAt(rows, at);
  return zeroCount > rows.length / 2 ? "0" : "1";
};

const getCo2RateAt = (rows: string[], at: number) => {
  const zeroCount = getZeroCountAt(rows, at);
  return zeroCount <= rows.length / 2 ? "0" : "1";
};

const getRate = (
  rows: string[],
  getRateAt: (rows: string[], at: number) => string
) => {
  const counter = rows[0];
  let rates = [...rows];
  let at = 0;

  do {
    if (at === counter.length) {
      at = 0;
    }
    const bit = getRateAt(rates, at);
    rates = rates.filter((rate) => rate[at] === bit);
    at += 1;
  } while (rates.length !== 1);

  return rates[0];
};

const task = () => {
  const oxygenRate = toNumber(getRate(rows, getOxygenRateAt).split(""));
  const co2Rate = toNumber(getRate(rows, getCo2RateAt).split(""));
  return oxygenRate * co2Rate;
};

withTime(task, day, part);
