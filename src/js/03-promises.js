import Notiflix from 'notiflix';

const form = document.querySelector('.form');
// const button = document.querySelector('button');
let delayValue = document.querySelector('input[name="delay"]');
let stepValue = document.querySelector('input[name="step"]');
let amountValue = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(delayValue.value);

  for (let i = 1; i <= amountValue.value; i+=1) {
    
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });

    delay += Number(stepValue.value);
  }
}

function createPromise(position, delay) {
  const obj = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}

