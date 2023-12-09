export const createForecastSubrow = (row: number[]): number[] => {
  const subrow: number[] = [];
  for (let i = 1; i < row.length; i++) {
    const prev = row.at(i - 1) ?? 0;
    const curr = row.at(i) ?? 0;
    subrow.push(curr - prev);
  }
  return subrow;
};
