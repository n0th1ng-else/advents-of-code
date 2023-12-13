const cacheCheckers: Record<string, boolean> = {};
const cacheVariants: Record<string, number> = {};

const getCacheId = (...parts: string[]) => parts.join(":");

const isPossible = (template: string, prefix: string): boolean => {
  const cacheId = getCacheId(template, prefix);

  if (typeof cacheCheckers[cacheId] === "boolean") {
    return cacheCheckers[cacheId];
  }

  for (let i = 0; i < prefix.length; i++) {
    const t = template[i];
    const p = prefix[i];
    if (t === "?") {
      continue;
    }
    if (t !== p) {
      cacheCheckers[cacheId] = false;
      return false;
    }
  }

  cacheCheckers[cacheId] = true;
  return true;
};

const countAdjusted = (
  template: string,
  parts: string[],
  fixed: string,
): number => {
  const cacheId = getCacheId(template, ...parts);
  if (typeof cacheVariants[cacheId] === "number") {
    return cacheVariants[cacheId];
  }

  if (parts.length === 1) {
    const [first] = parts;
    const restSize = template.length - first.length;
    let totalLoop = 0;

    for (let i = 0; i < restSize + 1; i++) {
      const expected = `${new Array(i).fill(".").join("")}${first}${new Array(
        restSize - i,
      )
        .fill(".")
        .join("")}`;
      if (isPossible(template, expected)) {
        totalLoop += 1;
      }
    }

    cacheVariants[cacheId] = totalLoop;
    return totalLoop;
  }

  const [first, ...rest] = parts;
  const restSize = rest.reduce((acc, r) => acc + r.length, 0);
  const checks = template.length - first.length - restSize + 1;
  let totalLoop = 0;
  for (let i = 0; i < checks; i++) {
    const expected = `${new Array(i).fill(".").join("")}${first}`;
    if (isPossible(template, expected)) {
      const templateCut = template.slice(expected.length);
      totalLoop += countAdjusted(templateCut, rest, `${fixed}${expected}`);
    }
  }

  cacheVariants[cacheId] = totalLoop;
  return totalLoop;
};

export const countVariants = (template: string, sequence: string): number => {
  const sequenceParts = sequence.split(",").map((size, index) => {
    const seq = new Array(Number(size)).fill("#").join("");
    return index === sequence.split(",").length - 1 ? seq : `${seq}.`;
  });

  return countAdjusted(template, sequenceParts, `${template} = `);
};
