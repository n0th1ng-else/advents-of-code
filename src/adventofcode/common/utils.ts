const getGreatestCommonDivisor = (first: number, second: number): number => {
  return second == 0 ? first : getGreatestCommonDivisor(second, first % second);
};

export const getLeastCommonMultiple = (
  first: number,
  seconds: number,
): number => {
  return (first * seconds) / getGreatestCommonDivisor(first, seconds);
};
