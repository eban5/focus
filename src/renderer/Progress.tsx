const Progress = (props: { intervals: string[] }) => {
  const { intervals } = props;
  return (
    <div id="progress" className="progress">
      {intervals.map((item: string, idx: number) => {
        return (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${idx}`}
            data-interval={idx}
            className="progress-item"
          />
        );
      })}
    </div>
  );
};

export default Progress;
