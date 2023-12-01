/**
 * npm run aoc 2022 11 1
 */

const ROUNDS = 20;
interface Monkey {
  id: number;
  items: number[];
  transform: (item: number) => number;
  decide: (item: number) => boolean;
  positiveId: number;
  negativeId: number;
  count: number;
}

const getNewMonkey = (id = -1): Monkey => {
  return {
    id,
    items: [],
    transform: (val) => val,
    decide: () => false,
    positiveId: -1,
    negativeId: -1,
    count: 0,
  };
};
const parseRows = (rows: string[]): Monkey[] => {
  const monkeys = rows.reduce<{ items: Monkey[]; current: Monkey }>(
    (res, row) => {
      const line = row.trim();

      if (!line) {
        return {
          items: [...res.items, res.current],
          current: getNewMonkey(),
        };
      }

      if (line.startsWith("Monkey")) {
        const idString = line.split(" ").at(1) || "";
        const id = Number(idString.slice(0, idString.length - 1));
        return {
          ...res,
          current: getNewMonkey(id),
        };
      }

      if (line.startsWith("Starting items")) {
        const itemsString = line.slice(line.indexOf(":") + 1);
        return {
          ...res,
          current: {
            ...res.current,
            items: itemsString.split(",").map((item) => Number(item.trim())),
          },
        };
      }

      if (line.startsWith("If true")) {
        const id = Number(line.split(" ").at(-1));
        return {
          ...res,
          current: {
            ...res.current,
            positiveId: id,
          },
        };
      }

      if (line.startsWith("If false")) {
        const id = Number(line.split(" ").at(-1));
        return {
          ...res,
          current: {
            ...res.current,
            negativeId: id,
          },
        };
      }

      if (line.startsWith("Test")) {
        const condition = Number(line.split(" ").at(-1));
        return {
          ...res,
          current: {
            ...res.current,
            decide: (val) => !(val % condition),
          },
        };
      }

      if (line.startsWith("Operation")) {
        const condition = line.split("=").at(-1)?.trim() || "";
        const [left, operator, right] = condition
          .split(" ")
          .map((item) => item.trim());
        return {
          ...res,
          current: {
            ...res.current,
            transform: (val) => {
              const l = Number(left);
              const r = Number(right);
              return operator === "+"
                ? (isNaN(l) ? val : l) + (isNaN(r) ? val : r)
                : (isNaN(l) ? val : l) * (isNaN(r) ? val : r);
            },
          },
        };
      }

      return res;
    },
    { items: [], current: getNewMonkey() },
  );

  return [...monkeys.items, monkeys.current];
};

const playOnce = (data: Monkey[], monkeyId: number) => {
  const monkey = data.find(({ id }) => id === monkeyId);
  if (!monkey || !monkey.items.length) {
    return;
  }
  do {
    const item = monkey.items.shift();
    if (!item) {
      break;
    }
    monkey.count += 1;
    const level = monkey.transform(item);
    const levelAfter = Math.floor(level / 3);
    const isValid = monkey.decide(levelAfter);
    const nextMonkeyId = isValid ? monkey.positiveId : monkey.negativeId;
    const next = data.find(({ id }) => id === nextMonkeyId);
    if (next) {
      next.items.push(levelAfter);
    }
  } while (monkey.items.length);
};

export const task = (rows: string[]) => {
  const data = parseRows(rows);

  for (let i = 0; i < ROUNDS; i++) {
    for (let j = 0; j < data.length; j++) {
      playOnce(data, j);
    }
  }

  const sorted = data.sort((a, b) => (a.count > b.count ? -1 : 1));
  return sorted[0].count * sorted[1].count;
};
