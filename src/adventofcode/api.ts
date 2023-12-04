const runAocApi = async (path: string, sessionId: string): Promise<string> => {
  const response = await fetch(`https://adventofcode.com/${path}`, {
    headers: { cookie: `session=${sessionId}` },
  });

  if (!response.ok) {
    throw new Error(
      `The aoc api responded with status ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  return text;
};

export const getTaskInput = async (
  year: string,
  day: string,
  sessionId: string,
): Promise<string> => {
  return await runAocApi(`${year}/day/${day}/input`, sessionId);
};
