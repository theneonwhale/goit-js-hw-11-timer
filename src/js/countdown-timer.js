const refs1 = {
  days: document.querySelector('#timer-1 [data-value="days"]'),
  hours: document.querySelector('#timer-1 [data-value="hours"]'),
  mins: document.querySelector('#timer-1 [data-value="mins"]'),
  secs: document.querySelector('#timer-1 [data-value="secs"]'),
};

const refs2 = {
  days: document.querySelector('#timer-2 [data-value="days"]'),
  hours: document.querySelector('#timer-2 [data-value="hours"]'),
  mins: document.querySelector('#timer-2 [data-value="mins"]'),
  secs: document.querySelector('#timer-2 [data-value="secs"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.intervalId = null;
    this.selector = selector;
    this.targetDate = targetDate;
    this.onTick = onTick;
  }

  start() {
    this.intervalId = setInterval(() => {
      const finishTime = this.targetDate;

      const currentTime = Date.now();
      const deltaTime = finishTime - currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);

      if (finishTime <= currentTime + 1000) {
        clearInterval(this.intervalId);
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
}

function updateTimerFace1({ days, hours, mins, secs }) {
  refs1.days.textContent = `${days}`;
  refs1.hours.textContent = `${hours}`;
  refs1.mins.textContent = `${mins}`;
  refs1.secs.textContent = `${secs}`;
}

function updateTimerFace2({ days, hours, mins, secs }) {
  refs2.days.textContent = `${days}`;
  refs2.hours.textContent = `${hours}`;
  refs2.mins.textContent = `${mins}`;
  refs2.secs.textContent = `${secs}`;
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 22, 2020 10:48:10'),
  onTick: updateTimerFace1,
});

const countdownTimer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Oct 22, 2020 01:55:00'),
  onTick: updateTimerFace2,
});

countdownTimer.start();
countdownTimer2.start();
