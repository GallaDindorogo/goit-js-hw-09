import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Form and its inputs

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  d: document.querySelector('[data-days]'),
  h: document.querySelector('[data-hours]'),
  m: document.querySelector('[data-minutes]'),
  s: document.querySelector('[data-seconds]'),
};

// flatpickr

let choosenDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.dateInput.style.borderColor = 'red';
      refs.btnStart.setAttribute('disabled', true);
      return;
    } else {
      choosenDate = selectedDates[0];
      Notify.success('Let"s start!');
      refs.btnStart.removeAttribute('disabled');
      refs.dateInput.style.borderColor = '#51acb6';
      refs.btnStart.addEventListener('click', timerOn);
    }
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

// time counter

function timerOn() {
  timerId = setInterval(() => {
    refs.btnStart.setAttribute('disable', true);
    refs.dateInput.setAttribute('disable', true);
    const deltaTime = choosenDate - Date.now();
    if (deltaTime < 1000) {
      clearInterval(timerId);
      refs.btnStart.removeAttribute('disable');
    }
    const convertDeltaTime = convertMs(deltaTime);
    updTimerInterface(convertDeltaTime);
  }, 1000);
}

// upd Timer's tablo

function updTimerInterface({ days, hours, minutes, seconds }) {
  refs.d.textContent = days;
  refs.h.textContent = hours;
  refs.m.textContent = minutes;
  refs.s.textContent = seconds;
}

//  convert Time's data

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// add first "0"
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
