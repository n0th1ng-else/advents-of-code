/**
 * deno run -A ./src/adventofcode/2021/day3/task2.ts
 */
import { readFile } from "../../common.ts";
import { getZeroCountAt, toNumber } from "./common.ts";

const rows = await readFile(3);

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

const oxygenRate = toNumber(getRate(rows, getOxygenRateAt).split(""));
const co2Rate = toNumber(getRate(rows, getCo2RateAt).split(""));

console.log("res", oxygenRate * co2Rate);
