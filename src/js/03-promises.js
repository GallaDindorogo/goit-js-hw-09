import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"'),
};

refs.formEl.addEventListener('submit', onCreatePromise);

function onCreatePromise(e) {
  e.preventDefault();
  const delay = Number.parseInt(refs.delayEl.value, 10);
  const step = Number.parseInt(refs.stepEl.value, 10);
  const amount = Number.parseInt(refs.amountEl.value, 10);
  createAllPromises(delay, step, amount);
}

function createAllPromises(delay, step, amount) {
  for (let i = 0 + 1; i <= amount; i++) {
    createPromise(i, delay).then(onResolve).catch(onReject);
    delay += step;
  }
  // ---
}

function onResolve({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onReject({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
