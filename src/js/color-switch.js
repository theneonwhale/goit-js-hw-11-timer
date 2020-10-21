import { colors } from './colors.js';

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-action="start"]'),
  btnStop: document.querySelector('[data-action="stop"]'),
};

refs.btnStart.addEventListener('click', onClickColorSwitchOn);

refs.btnStop.addEventListener('click', onClickColorSwitchOff);

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let intervalId = null;

function onClickColorSwitchOn() {
  intervalId = setInterval(() => {
    const RANDOM_COLOR =
      colors[randomIntegerFromInterval(0, colors.length - 1)];

    refs.body.style.backgroundColor = RANDOM_COLOR;
  }, 1000);

  refs.btnStart.disabled = true;
}

function onClickColorSwitchOff() {
  clearInterval(intervalId);

  refs.btnStart.disabled = false;
}
