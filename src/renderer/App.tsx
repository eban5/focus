/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/focus-wordmark.png';
import './App.css';
import Progress from './Progress';
import Timer from './Timer';

const WORK_SECONDS = 1500; // 25 mins in seconds
const BREAK_SECONDS = 300; // 5 mins in seconds
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

  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const convertToMinutesSeconds = (inputSeconds: number) => {
    const minutes = Math.floor(inputSeconds / 60);
    const seconds = inputSeconds % 60;
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  };

  const getTimeElapsedSinceLastStart = () => {
    if (!startTime) return 0;
    return Date.now() - startTime;
  };

  const start = (): void => {
    if (isRunning) {
      console.error('Timer is already running.');
      return;
    }
    setIsRunning(true);
    setStartTime(Date.now());
  };

  const stop = (): void => {
    if (!isRunning) {
      console.error('Timer is already stopped');
      return;
    }

    setIsRunning(false);

    setOverallTime(overallTime + getTimeElapsedSinceLastStart());
  };

  const reset = (): void => {
    setOverallTime(0);

    if (isRunning) {
      setStartTime(Date.now());
      return;
    }

    setStartTime(0);
  };

  const getTime = (): number => {
    if (!startTime) return 0;
    if (isRunning) return overallTime + getTimeElapsedSinceLastStart();
    return overallTime;
  };

  useEffect(() => {
    setInterval(() => {
      const timeInSeconds = Math.round(getTime() / 1000);
      const secondsDisplay = WORK_SECONDS - timeInSeconds;

      // reached end of timer
      if (secondsDisplay === 0) {
        stop();
        reset();
      }

      setTimer(convertToMinutesSeconds(secondsDisplay));
    }, 100);

    return () => {
      clearInterval();
    };
  }, []);

  return (
    <div className="wrapper">
      {/* <img width="90px" alt="icon" src={icon} /> */}
      <Progress intervals={intervals} />

      <Timer time={timer} />
      <div className="buttons">
        <button
          id="start"
          className="btn"
          type="button"
          onClick={() => start()}
        >
          Start
        </button>
        <button id="stop" className="btn" type="button">
          Stop
        </button>
        <button id="reset" className="btn" type="button">
          Reset
        </button>
      </div>
      <div className="skip">
        <button id="skip" className="btn btn-secondary" type="button">
          skip
        </button>
      </div>

      {/* <script src="./timer.js"></script>
    <script src="./progress.js"></script> */}
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
