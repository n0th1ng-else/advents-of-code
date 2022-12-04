export const getCharVolume = (char: string): number => {
  const lowerCase = char.charCodeAt(0) - 96;
  const upperCase = char.charCodeAt(0) - 38;
  return lowerCase < 0 ? upperCase : lowerCase;
};
