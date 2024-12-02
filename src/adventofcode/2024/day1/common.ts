export const parseLists = (rows: string[]): [number[], number[]] => {
  const { left, right } = rows.reduce(
    (acc, row) => {
      const items = row
        .split(" ")
        .filter((i) => i !== "")
        .map((i) => Number(i));
      const l = items.at(0);
      const r = items.at(1);
      if (!l || !r) {
        throw new Error("data issue?");
      }
      return {
        left: [...acc.left, l],
        right: [...acc.right, r],
      };
    },
    { left: new Array<number>(), right: new Array<number>() },
  );

  return [left, right];
};
