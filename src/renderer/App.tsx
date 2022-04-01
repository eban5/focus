/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Progress from './Progress';
import Timer from './Timer';

const WORK_SECONDS = 10; // 25 mins in seconds
const BREAK_SECONDS = 5; // 5 mins in seconds
const intervals = [
  'work',
  'break',
  'work',
  'break',
  'work',
  'break',
  'work',
  'break',
  'work',
  'break',
];

const Hello = () => {
  // https://stackoverflow.com/a/57981688
  const [timer, setTimer] = useState<string>('0:00');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [overallTime, setOverallTime] = useState<number>(0);
  const [currentInterval, setCurrentInterval] = useState<number>(5);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const convertToMinutesSeconds = (inputSeconds: number) => {
    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  };

  const getTimeElapsedSinceLastStart = (timeStart: number) => {
    if (!timeStart) return 0;
    return Date.now() - timeStart;
  };

  const start = (): void => {
    if (isRunning) {
      console.error('Timer is already running.');
      return;
    }
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stop = (timeStart: number, timeOverall: number): void => {
    if (!isRunning) {
      console.error('Timer is already stopped');
      return;
    }

    setIsRunning(false);
    setOverallTime(timeOverall + getTimeElapsedSinceLastStart(timeStart));
  };

  const reset = (): void => {
    setOverallTime(0);

    if (isRunning) {
      setStartTime(Date.now());
      return;
    }

    setStartTime(0);
  };

  const complete = (): void => {
    setIsComplete(true);
    setIsRunning(false);
  };

  const getInterval = (): string => {
    return intervals[currentInterval];
  };

  const nextInterval = (): void => {
    // reached end of work
    if (currentInterval === 9) {
      complete();
      return;
    }

    // at the start of the next interval, the clock is not running
    setIsRunning(false);
    setCurrentInterval(currentInterval + 1);
    stop(startTime, overallTime);
    reset();
  };

  const startOver = (): void => {
    // reset everything
    setIsRunning(false);
    setCurrentInterval(0);
    reset();
    setIsComplete(false);
  };

  const getTime = (): number => {
    if (!startTime) return 0;
    if (isRunning) return overallTime + getTimeElapsedSinceLastStart(startTime);
    return overallTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeInSeconds = Math.round(getTime() / 1000);
      const secondsDisplay =
        getInterval() === 'work'
          ? WORK_SECONDS - timeInSeconds
          : BREAK_SECONDS - timeInSeconds;

      // reached end of timer
      if (secondsDisplay === 0) nextInterval();

      setTimer(convertToMinutesSeconds(secondsDisplay));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  return (
    <div className="wrapper">
      <Progress
        intervals={intervals}
        currentInterval={currentInterval}
        isComplete={isComplete}
      />

      {isComplete ? (
        <div>
          All done!
          <button
            id="startOver"
            className="btn btn-secondary"
            type="button"
            onClick={startOver}
          >
            start over
          </button>
        </div>
      ) : (
        <>
          <Timer time={timer} />
          <div className="buttons">
            <button id="start" className="btn" type="button" onClick={start}>
              Start
            </button>
            <button
              id="stop"
              className="btn"
              type="button"
              onClick={() => stop(startTime, overallTime)}
            >
              Stop
            </button>
            <button id="reset" className="btn" type="button" onClick={reset}>
              Reset
            </button>
          </div>
          <div className="skip">
            <button
              id="skip"
              className="btn btn-secondary"
              type="button"
              onClick={nextInterval}
            >
              skip
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
