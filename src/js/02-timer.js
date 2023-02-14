// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const start = document.querySelector('[data-start]');

const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

start.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2,'0');
}

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
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

let selectedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
      const time = convertMs(0);
      addTimeToPage(time);
      clearInterval(intervalId);
    } else {
      Notiflix.Notify.success('Thank you, you have selected a date in the future');
      start.disabled = false;
      // selectedTime = Date.parse(selectedDates[0]);
      selectedTime = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

start.addEventListener('click', startTimer);

function startTimer() {
  intervalId = setInterval(() => {
    const deltaTime = selectedTime - Date.now();
    const time = convertMs(deltaTime);
    addTimeToPage(time);
  }, 1000);

  start.disabled = true;
}

function addTimeToPage({days, hours, minutes, seconds}) {
  daysValue.textContent = `${days}`;
  hoursValue.textContent = `${hours}`;
  minutesValue.textContent = `${minutes}`;
  secondsValue.textContent = `${seconds}`;
}