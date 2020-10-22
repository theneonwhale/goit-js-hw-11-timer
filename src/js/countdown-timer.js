class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start() {
    this.intervalId = setInterval(() => {
      const TARGET_TIME = this.targetDate;
      const CURRENT_TIME = Date.now();
      const DELTA_TIME = TARGET_TIME - CURRENT_TIME;
      const TIME = this.getTimeComponents(DELTA_TIME);

      this.updateTimerFace(TIME);

      if (TARGET_TIME <= CURRENT_TIME + 1000) {
        clearInterval(this.intervalId);

        const TIME = this.getTimeComponents(0);

        this.updateTimerFace(TIME);
      }
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateTimerFace({ days, hours, mins, secs }) {
    document.querySelector(
      `${this.selector} [data-value="days"]`,
    ).textContent = `${days}`;
    document.querySelector(
      `${this.selector} [data-value="hours"]`,
    ).textContent = `${hours}`;
    document.querySelector(
      `${this.selector} [data-value="mins"]`,
    ).textContent = `${mins}`;
    document.querySelector(
      `${this.selector} [data-value="secs"]`,
    ).textContent = `${secs}`;
  }
}

const countdownTimerOne = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Dec 31, 2020 23:59:59'),
});

const countdownTimerTwo = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Feb 14, 2021 23:59:59'),
});

countdownTimerOne.start();
countdownTimerTwo.start();
