export const multiplyFromString = (x: string, y: string): number => {
  return Number(x) * Number(y);
};

const MULTIPLY_REG_EXP = new RegExp("mul\\((\\d+),(\\d+)\\)", "g");

export const scanCommands = (
  row: string,
  pattern?: RegExp,
): RegExpExecArray[] => {
  const res = [...row.matchAll(pattern ?? MULTIPLY_REG_EXP)];
  return res;
};
