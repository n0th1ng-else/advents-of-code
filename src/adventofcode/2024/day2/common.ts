export const getReports = (rows: string[]): number[][] => {
  const reports = rows.map((row) => {
    const parsed = row.split(" ").map((i) => Number(i));
    return parsed;
  });
  return reports;
};

export const isReportSafe = (report: number[]): boolean => {
  let sameDirection: boolean | undefined = undefined;
  for (let i = 0; i < report.length - 1; i++) {
    const step = report[i + 1] - report[i];
    const direction = step > 0;

    if (typeof sameDirection !== "boolean") {
      sameDirection = direction;
    }

    if (!step) {
      return false;
    }

    if (step > 3 || step < -3) {
      return false;
    }

    if (sameDirection !== direction) {
      return false;
    }
  }

  return true;
};
