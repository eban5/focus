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
          {intervals[currentInterval].charAt(0).toUpperCase() +
            intervals[currentInterval].substring(1)}
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
