function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.body,
};

let timerId = null;

// function to random switch color

const backgroundColorSwitcher = function () {
  refs.body.style.backgroundColor = getRandomHexColor();
};

//  start color changing

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(backgroundColorSwitcher, 1000);
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
});

//  stop color changing

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.stopBtn.setAttribute('disabled', true);
  refs.startBtn.removeAttribute('disabled');
});
