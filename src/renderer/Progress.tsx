const Progress = (props: { intervals: string[] }) => {
  const { intervals } = props;
  return (
    <div id="progress" className="progress">
      {intervals.map((item: string, idx: number) => {
        return <div key={item} data-interval={idx} className="progress-item" />;
      })}
    </div>
  );
};

export default Progress;
