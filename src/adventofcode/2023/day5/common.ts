type MappedArr = {
  sourceStart: number;
  sourceEnd: number;
  dest: number;
};

const transformNumberByMap = (
  initial: number,
  mapRows: MappedArr[],
): number => {
  const row = mapRows.find((mapRow) => {
    return initial >= mapRow.sourceStart && initial <= mapRow.sourceEnd;
  });

  if (!row) {
    return initial;
  }

  const diff = initial - row.sourceStart;
  const adjusted = row.dest + diff;

  return adjusted;
};

const CACHE: Record<string, MappedArr[]> = {};
const CACHE_KEYS: Record<string, true> = {};

const transformNumberByRows = (
  initial: number[],
  rows: string[],
  cacheKey: string,
  cached?: MappedArr[],
): number[] => {
  if (!rows.length) {
    return initial;
  }

  const arr: MappedArr[] =
    cached ||
    CACHE[cacheKey] ||
    rows.map((row) => {
      const [dest, source, size] = row.split(" ").map(Number);
      return {
        sourceStart: source,
        sourceEnd: source + size - 1,
        dest,
      };
    });

  CACHE[cacheKey] = arr;

  CACHE_KEYS[cacheKey] = true;
  return initial.map((item) => transformNumberByMap(item, arr));
};

export const mapAllSeeds = (
  seeds: number[],
  originalRows: string[],
  useCache = false,
): number[] => {
  if (useCache) {
    Object.keys(CACHE_KEYS).forEach((key) => {
      seeds = transformNumberByRows(seeds, [], key);
    });
  }

  const rows = [...originalRows];
  let buffer: string[] = [];
  let cacheKey = "";
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row) {
      continue;
    }
    if (row.endsWith(":")) {
      seeds = transformNumberByRows(seeds, buffer, cacheKey);
      cacheKey = row;

      buffer = [];
      continue;
    } else {
      buffer.push(row);
    }
  }

  seeds = transformNumberByRows(seeds, buffer, cacheKey);
  return seeds;
};

export const getMinimalSeed = (seeds: number[]): number => {
  return seeds.reduce((acc, item) => (acc ? Math.min(acc, item) : item), 0);
};
