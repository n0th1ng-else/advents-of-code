export const findMessage =
  (markerLength: number) =>
  (rows: string[]): number => {
    const row = rows.shift();
    if (!row) {
      throw new Error("oops");
    }

    for (let i = 0; i < row.length - markerLength; i++) {
      const storage = new Set<string>();
      for (let j = 0; j < markerLength; j++) {
        const char = row.at(i + j) || "";
        storage.add(char);
      }

      if (storage.size === markerLength) {
        return i + markerLength;
      }
    }

    return 0;
  };
