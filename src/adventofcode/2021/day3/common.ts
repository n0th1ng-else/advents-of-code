export const toNumber = (binary: string[]): number =>
  binary.reduce((acc, bit) => acc * 2 + Number(bit), 0);

export const invertBinary = (parts: string[]) =>
  parts.map((bit) => (bit === "1" ? "0" : "1"));

export const getZeroCountAt = (rows: string[], at: number) =>
  rows.reduce((acc, row) => (row[at] === "1" ? acc : acc + 1), 0);
