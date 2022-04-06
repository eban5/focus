//formatting helpers

export const toTitleCase = (value: string): string => {
  // split by whitespace
  // capitalize first char of each word
  // join and return
  return value
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ');
};
