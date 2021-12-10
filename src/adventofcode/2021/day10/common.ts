const CLOSING_CHAR_SCORE: Record<string, number> = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const OPENING_CHAR_SCORE: Record<string, number> = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const CLOSING_CHAR_MAP: Record<string, string> = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const OPENING_CHAR_MAP: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export const getClosingCharScore = (char: string): number => {
  const score = CLOSING_CHAR_SCORE[char];
  if (score) {
    return score;
  }
  throw new Error(`Invalid character: ${char}`);
};

export const getOpeningCharScore = (char: string): number => {
  const score = OPENING_CHAR_SCORE[char];
  if (score) {
    return score;
  }
  throw new Error(`Invalid character: ${char}`);
};

export const getOpeningChar = (char: string): string | undefined =>
  CLOSING_CHAR_MAP[char];

export const getClosingChar = (char: string): string | undefined =>
  OPENING_CHAR_MAP[char];
