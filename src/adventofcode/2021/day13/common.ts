type PaperPosition = "#" | ".";

type Paper = Record<string, PaperPosition>;

type FoldAxe = "x" | "y";

export type Fold = {
  axe: FoldAxe;
  line: number;
};
type ParsedRes = {
  collectFolds: boolean;
  net: Paper;
  folds: Fold[];
};

type TwoD = { x: number; y: number };

export const parseInput = (rows: string[]): [Paper, Fold[]] => {
  const { net, folds } = rows.reduce<ParsedRes>(
    (res, row) => {
      if (!row) {
        return {
          ...res,
          collectFolds: true,
        };
      }

      if (res.collectFolds) {
        const [_a, _d, pair] = row.split(" ");
        const [axe, val] = pair.split("=");
        if (axe === "x" || axe === "y") {
          res.folds.push({
            axe,
            line: Number(val),
          });
        }
        return res;
      }

      res.net[row] = "#";
      return res;
    },
    {
      collectFolds: false,
      net: {},
      folds: [],
    }
  );

  return [net, folds];
};

export const getCoords = (id: string): TwoD => {
  const [x, y] = id.split(",");
  return { x: Number(x), y: Number(y) };
};

export const getId = (x: number, y: number): string => `${x},${y}`;

export const getSize = (net: Paper): TwoD =>
  Object.keys(net).reduce(
    (res, id) => {
      const { x, y } = getCoords(id);
      return {
        x: Math.max(res.x, x),
        y: Math.max(res.y, y),
      };
    },
    { x: 0, y: 0 }
  );

export const countDots = (net: Paper): number =>
  Object.keys(net).reduce((sum, id) => {
    const adder = net[id] === "#" ? 1 : 0;
    return sum + adder;
  }, 0);

const doVerticalFold = (net: Paper, line: number, sizes: TwoD) => {
  const smallest = Math.min(sizes.x - line, line);
  const biggest = Math.max(sizes.x - line, line);

  new Array(sizes.y + 1).fill(0).forEach((_, j) => {
    new Array(smallest + 1).fill(0).forEach((_, i) => {
      const idTop = getId(line - i, j);
      const idBottom = getId(line + i, j);
      const point = net[idBottom] || ".";
      net[idBottom] = ".";
      if (net[idTop] !== "#") {
        net[idTop] = point;
      }
    });
  });
  sizes.x = biggest - 1;
};

const doHorizontalFold = (net: Paper, line: number, sizes: TwoD) => {
  const smallest = Math.min(sizes.y - line, line);
  const biggest = Math.max(sizes.y - line, line);

  new Array(smallest + 1).fill(0).forEach((_, j) => {
    new Array(sizes.x + 1).fill(0).forEach((_, i) => {
      const idTop = getId(i, line - j);
      const idBottom = getId(i, line + j);
      const point = net[idBottom] || ".";
      net[idBottom] = ".";
      if (net[idTop] !== "#") {
        net[idTop] = point;
      }
    });
  });
  sizes.y = biggest - 1;
};

export const doFold = (net: Paper, fold: Fold, sizes: TwoD): void =>
  fold.axe === "x"
    ? doVerticalFold(net, fold.line, sizes)
    : doHorizontalFold(net, fold.line, sizes);

export const renderNet = (net: Paper, sizes: TwoD): void => {
  const view = new Array(sizes.y + 1).fill(0).reduce((display, _, j) => {
    const newLine = new Array(sizes.x + 1).fill(0).reduce((line, _, i) => {
      const point = net[getId(i, j)] || ".";
      return `${line}${point}`;
    }, "");
    return `${display}\n${newLine}`;
  }, "");
  console.log(view);
};
