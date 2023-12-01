export const findDigitsAndSum = (rows: string[]): number => {
  const nums = rows.map((row) => {
    const digits = row.replace(/\D/g, "");
    const num = `${digits.at(0)}${digits.at(-1)}`;
    return Number(num);
  });

  return nums.reduce((acc, num) => acc + num, 0);
};
