function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const form = document.querySelector(".form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const delay = parseInt(form.elements["delay"].value);
  const step = parseInt(form.elements["step"].value);
  const amount = parseInt(form.elements["amount"].value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + step * i;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
