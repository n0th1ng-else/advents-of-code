export const runHashOnSequence = (sequence: string): number => {
  let curr = 0;
  for (let i = 0; i < sequence.length; i++) {
    const code = sequence.charCodeAt(i);
    curr = curr + code;
    curr = curr * 17;
    curr = curr % 256;
  }
  return curr;
};
