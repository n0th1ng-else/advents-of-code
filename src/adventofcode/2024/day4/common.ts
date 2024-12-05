export const findLetter = (
  letter: string,
  arr: string[][],
): Array<{ i: number; j: number }> => {
  const results: Array<{ i: number; j: number }> = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === letter) {
        results.push({ i, j });
      }
    }
  }
  return results;
};
