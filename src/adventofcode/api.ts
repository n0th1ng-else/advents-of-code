const runAocApi = async (path: string, sessionId: string): Promise<string> => {
  const url = `https://adventofcode.com/${path}`;
  const response = await fetch(url, {
    headers: { cookie: `session=${sessionId}` },
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(
      `Tried to fetch ${url}, but it responded with status ${response.status} ${response.statusText}`,
      { cause: { responseText: text } },
    );
  }

  return text;
};

export const getTaskInput = async (
  year: string,
  day: string,
  sessionId: string,
): Promise<string> => {
  return await runAocApi(`${year}/day/${day}/input`, sessionId);
};
