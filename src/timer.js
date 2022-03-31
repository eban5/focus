const progress = require("progress");

const WORK_SECONDS = 1500; //25 mins in seconds
const BREAK_SECONDS = 300; //5 mins in seconds

class Timer {
    // https://stackoverflow.com/a/57981688
    constructor() {
        this.isRunning = false;
        this.isWork = true; // either work or break
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart() {
        if (!this.startTime) {
            return 0;
        }

        return Date.now() - this.startTime;
    }

    _convertToMinutesSeconds(inputSeconds) {
        const minutes = Math.floor(inputSeconds / 60);
        const seconds = inputSeconds % 60;
        return `${this._padTo2Digits(minutes)}:${this._padTo2Digits(seconds)}`;
    }

    _padTo2Digits(num) {
        return num.toString().padStart(2, "0");
    }

    start() {
        if (this.isRunning) {
            return console.error("Timer is already running");
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }

    stop() {
        if (!this.isRunning) {
            return console.error("Timer is already stopped");
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset() {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }

    getTime() {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }

    getInterval() {
        if (this.isWork) {
            this.isWork = !this.isWork;
            return this.isWork;
        }
    }
}

const timer = new Timer();

setInterval(() => {
    const timeInSeconds = Math.round(timer.getTime() / 1000);
    let secondsDisplay = WORK_SECONDS - timeInSeconds;

    // reached end of timer
    if (secondsDisplay === 0) {
        timer.stop();
        timer.reset();
    }

    document.getElementById("timer").innerText = timer._convertToMinutesSeconds(secondsDisplay);
}, 100);

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

if (startBtn) {
    startBtn.addEventListener("click", () => timer.start());
}
if (stopBtn) {
    stopBtn.addEventListener("click", () => timer.stop());
}
if (resetBtn) {
    resetBtn.addEventListener("click", () => timer.reset());
}
