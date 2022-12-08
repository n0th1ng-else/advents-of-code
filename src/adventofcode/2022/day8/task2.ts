/**
 * npm run aoc 2022 8 2
 */

const getCurrentMax = (rows: number[][], i: number, j: number): number => {
  const item = rows[i][j];
  let score = 1;
  let local = 0;

  local = 0;
  for (let ind = 0; ind < i; ind++) {
    const curr = rows[i - ind - 1][j];
    local += 1;
    if (curr >= item) {
      break;
    }
  }
  score = score * local;

  local = 0;
  for (let ind = i + 1; ind < rows.length; ind++) {
    const curr = rows[ind][j];
    local += 1;
    if (curr >= item) {
      break;
    }
  }
  score = score * local;

  local = 0;
  for (let ind = 0; ind < j; ind++) {
    const curr = rows[i][j - ind - 1];
    local += 1;
    if (curr >= item) {
      break;
    }
  }
  score = score * local;

  local = 0;
  for (let ind = j + 1; ind < rows[0].length; ind++) {
    const curr = rows[i][ind];
    local += 1;
    if (curr >= item) {
      break;
    }
  }
  score = score * local;

  return score;
};

export const task = (rows: string[]) => {
  const forest = rows.map((row) => {
    const items = row.split("").map((r) => Number(r));
    return items;
  });
  let score = 0;

  for (let i = 1; i < forest.length - 1; i++) {
    for (let j = 1; j < forest[i].length - 1; j++) {
      const current = getCurrentMax(forest, i, j);
      score = current > score ? current : score;
    }
  }

  return score;
};
