/**
 * npm run aoc 2022 21 1
 */

type Item = {
  id: string;
} & (
  | {
      hasResult: true;
      result: number;
    }
  | {
      hasResult: false;
      operations: string[];
    }
);

const parseRows = (rows: string[]): Map<string, Item> => {
  return rows.reduce((acc, row) => {
    const parts = row.split(":");
    const id = parts[0];
    const operations = parts[1].trim().split(" ");
    if (operations.length === 1) {
      acc.set(id, {
        id,
        hasResult: true,
        result: Number(operations[0]),
      });
      return acc;
    }

    acc.set(id, {
      id,
      hasResult: false,
      operations,
    });
    return acc;
  }, new Map<string, Item>());
};

const calcItem = (left: Item, right: Item, operation: string): number => {
  if (!left.hasResult || !right.hasResult) {
    throw new Error("impossible");
  }
  const l = left.result;
  const r = right.result;

  switch (operation) {
    case "+":
      return l + r;
    case "*":
      return l * r;
    case "-":
      return l - r;
    case "/":
      return Math.floor(l / r);
    default:
      throw new Error(`operation??? ${operation}`);
  }
};

const calc = (items: Map<string, Item>): [Map<string, Item>, boolean] => {
  let isFinished = true;
  for (let [key, item] of items.entries()) {
    if (item.hasResult) {
      continue;
    }

    const [leftId, operation, rightId] = item.operations;
    const left = items.get(leftId);
    const right = items.get(rightId);

    if (left?.hasResult && right?.hasResult) {
      items.set(key, {
        id: key,
        hasResult: true,
        result: calcItem(left, right, operation),
      });
    }

    isFinished = false;
  }
  return [items, isFinished];
};

export const task = (rows: string[]) => {
  let data = parseRows(rows);
  let isFinished = false;
  do {
    const [r, i] = calc(data);
    data = r;
    isFinished = i;
  } while (!isFinished);

  const root = data.get("root");
  if (!root?.hasResult) {
    throw new Error("what??");
  }
  return root.result;
};
