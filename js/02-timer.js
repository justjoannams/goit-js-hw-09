const startBtn = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");
let timerId = null;

startBtn.setAttribute("disabled", true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => String(value).padStart(2, "0");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure("Please choose a date in the future");
      return;
    }
    startBtn.removeAttribute("disabled");

    const showTimer = () => {
      const now = new Date();
      localStorage.setItem("selectedDate", selectedDates[0]);
      const selectedDate = new Date(localStorage.getItem("selectedDate"));

      if (!selectedDate) return;

      const diff = selectedDate - now;
      const { days, hours, minutes, seconds } = convertMs(diff);
      daysRef.textContent = days;
      hoursRef.textContent = addLeadingZero(hours);
      minutesRef.textContent = addLeadingZero(minutes);
      secondsRef.textContent = addLeadingZero(seconds);

      if (
        Number(daysRef.textContent) === 0 &&
        Number(hoursRef.textContent) === 0 &&
        Number(minutesRef.textContent) === 0 &&
        Number(secondsRef.textContent) === 0
      ) {
        clearInterval(timerId);
      }
    };

    const onClick = () => {
      if (timerId) {
        clearInterval(timerId);
      }
      showTimer();
      timerId = setInterval(showTimer, 1000);
    };

    startBtn.addEventListener("click", onClick);
  },
};

flatpickr("#datetime-picker", { ...options });
