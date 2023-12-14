const getGreatestCommonDivisor = (first: number, second: number): number => {
  return second == 0 ? first : getGreatestCommonDivisor(second, first % second);
};

export const getLeastCommonMultiple = (
  first: number,
  seconds: number,
): number => {
  return (first * seconds) / getGreatestCommonDivisor(first, seconds);
};

export const getFactorial = (num: number): number =>
  num ? num * getFactorial(num - 1) : 1;

export const transponMatrix = <T>(current: T[][]): T[][] => {
  const mapped: T[][] = [];
  for (let j = 0; j < current[0].length; j++) {
    const line: T[] = [];
    for (let i = current.length - 1; i >= 0; i--) {
      line.push(current[i][j]);
    }
    mapped.push(line);
  }
  return mapped;
};
