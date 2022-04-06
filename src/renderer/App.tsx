/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Progress from './Progress';

const WORK_SECONDS = 1500; // 25 mins
const SHORT_BREAK_SECONDS = 300; // 5 mins
const LONG_BREAK_SECONDS = 1800; // 30 mins
const intervals = [
  'work',
  'short break',
  'work',
  'short break',
  'work',
  'short break',
  'work',
  'short break',
  'work',
  'long break',
  'work',
  'short break',
  'work',
  'short break',
  'work',
  'short break',
  'work',
  'short break',
  'complete',
];

enum Interval {
  WORK = 'work',
  SHORT_BREAK = 'short break',
  LONG_BREAK = 'long break',
  COMPLETE = 'complete',
}

const Focus = () => {
  // https://stackoverflow.com/a/57981688
  const [timer, setTimer] = useState<string>('0:00');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [overallTime, setOverallTime] = useState<number>(0);
  const [currentInterval, setCurrentInterval] = useState<number>(0);
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
    if (intervals[currentInterval] === Interval['COMPLETE']) {
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
      let secondsDisplay;
      switch (getInterval()) {
        case Interval['WORK']:
          secondsDisplay = WORK_SECONDS - timeInSeconds;
          break;
        case Interval['SHORT_BREAK']:
          secondsDisplay = SHORT_BREAK_SECONDS - timeInSeconds;
          break;
        case Interval['LONG_BREAK']:
          secondsDisplay = LONG_BREAK_SECONDS - timeInSeconds;
          break;
        default:
          secondsDisplay = 0;
          break;
      }

      // reached end of timer
      if (secondsDisplay === 0) nextInterval();

      setTimer(convertToMinutesSeconds(secondsDisplay));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    console.log(isComplete, document.body.classList);
    if (isComplete) {
      document.body.classList.remove('work-interval');
      document.body.classList.remove('break-interval');
      document.body.classList.add('complete');
    } else if (!isComplete) {
      document.body.classList.remove('complete');
      if (intervals[currentInterval] === Interval.WORK) {
        if (!document.body.classList.contains('work-interval')) {
          document.body.classList.remove('break-interval');
          document.body.classList.add('work-interval');
        }
      } else if (intervals[currentInterval] === Interval.SHORT_BREAK) {
        if (!document.body.classList.contains('break-interval')) {
          document.body.classList.remove('work-interval');
          document.body.classList.add('break-interval');
        }
      } else if (intervals[currentInterval] === Interval.LONG_BREAK) {
        if (!document.body.classList.contains('break-interval')) {
          document.body.classList.remove('work-interval');
          document.body.classList.add('break-interval-long');
        }
      }
    }
  }, [nextInterval]);

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
          <div id="timer" className="timer">
            {timer}
          </div>
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
        <Route path="/" element={<Focus />} />
      </Routes>
    </Router>
  );
}
