// formatting helpers

const toTitleCase = (value: string): string => {
  return value
    .split(' ')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    )
    .join(' ');
};

export default toTitleCase;
