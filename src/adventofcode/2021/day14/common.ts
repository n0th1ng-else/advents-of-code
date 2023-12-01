interface Rule {
  seq: string;
  left: string;
  right: string;
  res: string;
}

export const getStat = (row: string) =>
  row.split("").reduce<Record<string, number>>((acc, char) => {
    adjustElement(acc, char, 1);
    return acc;
  }, {});

export const parseInput = (rows: string[]) => {
  const init = rows.shift() || "";

  const net = init
    .split("")
    .reduce<Record<string, number>>((acc, char, ind, arr) => {
      const next = arr[ind + 1] || "";
      if (!next) {
        return acc;
      }
      adjustElements(acc, char, next, 1);
      return acc;
    }, {});

  const rules = rows
    .filter((r) => r)
    .reduce<Record<string, Rule>>((acc, row) => {
      const [seq, res] = row.split(" -> ");
      const [left, right] = seq.split("");
      acc[seq] = {
        seq,
        left,
        right,
        res,
      };
      return acc;
    }, {});

  const stat = getStat(init);
  return { rules, net, stat };
};

const adjustElement = (
  net: Record<string, number>,
  seq: string,
  adjuster: number,
) => {
  if (!net[seq]) {
    net[seq] = 0;
  }
  net[seq] += adjuster;
  if (!net[seq]) {
    delete net[seq];
  }
};

const adjustElements = (
  net: Record<string, number>,
  char1: string,
  char2 = "",
  adjuster: number,
) => adjustElement(net, `${char1}${char2}`, adjuster);

export const doStep = (
  net: Record<string, number>,
  rules: Record<string, Rule>,
  stat: Record<string, number>,
) => {
  const n = { ...net };
  Object.keys(net).forEach((seq) => {
    const rule = rules[seq];

    if (!rule) {
      return;
    }
    adjustElements(net, rule.left, rule.res, n[seq]);
    adjustElements(net, rule.res, rule.right, n[seq]);
    adjustElements(net, rule.left, rule.right, 0 - n[seq]);
    adjustElement(stat, rule.res, n[seq]);
  });
};
