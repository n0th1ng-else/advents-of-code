/**
 * npm run aoc 2022 8 1
 */

const isVisible = (rows: number[][], i: number, j: number): boolean => {
  const item = rows[i][j];
  const top = new Array(i).fill(null).every((_, ind) => item > rows[ind][j]);
  const bottom = new Array(rows.length - i - 1)
    .fill(null)
    .every((_, ind) => item > rows[i + ind + 1][j]);

  const left = new Array(j).fill(null).every((_, ind) => item > rows[i][ind]);
  const right = new Array(rows[0].length - j - 1)
    .fill(null)
    .every((_, ind) => item > rows[i][j + ind + 1]);

  return top || bottom || left || right;
};
export const task = (rows: string[]) => {
  const forest = rows.map((row) => {
    const items = row.split("").map((r) => Number(r));
    return items;
  });
  let open = 2 * (forest.length + forest[0].length) - 4;
  for (let i = 1; i < forest.length - 1; i++) {
    for (let j = 1; j < forest[i].length - 1; j++) {
      if (isVisible(forest, i, j)) {
        open += 1;
      }
    }
  }

  return open;
};
