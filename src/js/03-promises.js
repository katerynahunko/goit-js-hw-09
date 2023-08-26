
const amount = document.querySelector('input[name="amount"]');
const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener("click", onStart);

function onStart(event) {
  event.preventDefault();

  // const promiseAmount = parseInt(amount.value);
  // const promiseDelay = parseInt(delay.value);
  // const promiseStep = parseInt(step.value);
  
  const promiseAmount = amount.value;
  const promiseDelay = delay.value;
  const promiseStep = step.value;

  for (let i = 1; i <= promiseAmount; i += 1) {
    const currentDelay = promiseDelay + (i - 1) * promiseStep;

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
