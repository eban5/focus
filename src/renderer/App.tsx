import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/focus-wordmark.png';
import './App.css';

const Hello = () => {
  return (
    <div className="wrapper">
      {/* <img width="90px" alt="icon" src={icon} /> */}

      <div id="progress" className="progress">
        <div data-interval="1" className="progress-item"></div>
        <div data-interval="2" className="progress-item"></div>
        <div data-interval="3" className="progress-item"></div>
        <div data-interval="4" className="progress-item"></div>
        <div data-interval="5" className="progress-item"></div>
      </div>
      <div id="timer" className="timer"></div>
      <div className="buttons">
        <button id="start" className="btn">
          Start
        </button>
        <button id="stop" className="btn">
          Stop
        </button>
        <button id="reset" className="btn">
          Reset
        </button>
      </div>
      <div className="skip">
        <button id="skip" className="btn btn-secondary">
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
