export const toTitleCase = (value: string): string => {
  // split by whitespace
  // capitalize first char of each word
  // join and return
  return value
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

const Progress = (props: {
  intervals: string[];
  currentInterval: number;
  isComplete: boolean;
}) => {
  const { intervals, currentInterval, isComplete } = props;
  return (
    <>
      {!isComplete && (
        <div className="interval-name">
          {toTitleCase(intervals[currentInterval])}
        </div>
      )}
      <div id="progress" className="progress">
        {intervals.map((item: string, idx: number) => {
          const statusClass =
            // eslint-disable-next-line no-nested-ternary
            idx === currentInterval
              ? 'in-progress'
              : idx < currentInterval || currentInterval === 9
              ? 'done'
              : '';
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`item-${idx}`}
              data-interval={idx}
              className={`progress-item ${item} ${statusClass}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default Progress;
