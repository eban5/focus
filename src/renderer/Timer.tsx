const Timer = (props: { time: string }) => {
  const { time } = props;
  return (
    <div id="timer" className="timer">
      {time}
    </div>
  );
};

export default Timer;
