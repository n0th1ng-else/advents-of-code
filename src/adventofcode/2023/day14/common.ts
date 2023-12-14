export const transformReflections = (rows: string[][]): string[][] => {
  for (let j = 0; j < rows[0].length; j++) {
    let changed = false;
    let lastId = rows.length - 1;
    let lastIdPre = rows.length - 1;
    do {
      changed = false;
      lastId = lastIdPre;
      for (let i = 1; i <= lastId; i++) {
        if (rows[i][j] === "O") {
          lastIdPre = i;
        }
        if (rows[i - 1][j] === "." && rows[i][j] === "O") {
          rows[i - 1][j] = rows[i][j];
          rows[i][j] = ".";
          changed = true;
        }
      }
    } while (changed);
  }

  return rows;
};

export const calculatePressure = (rows: string[][]): number => {
  let sum = 0;
  for (let i = 0; i < rows.length; i++) {
    const offset = rows.length - i;
    for (let j = 0; j < rows[0].length; j++) {
      if (rows[i][j] === "O") {
        sum += offset;
      }
    }
  }
  return sum;
};
