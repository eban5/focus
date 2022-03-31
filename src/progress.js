//progress.js

const TOTAL_INTERVALS = 5;

class Progress {
    constructor() {
        this.currentInterval = 0;
    }

    getInterval() {
      return this.currentInterval;
    }
    
}

getProgress()  {
    console.log("get progress");
    const progressBar = document.getElementById("progress");
    const progressItems = document.getElementsByClassName("progress-item");

    if (progressBar && progressItems) {
        // init state: first interval 'in progress' state
        const firstInterval = progressItems[0];
        if (firstInterval) firstInterval.classList.add("in-progress");

        for (let item = 0; item < progressItems.length; item++) {
            const element = progressItems[item];
            console.log(element);
        }
    }
};

const progress = new Progress();
x;

getProgress();
