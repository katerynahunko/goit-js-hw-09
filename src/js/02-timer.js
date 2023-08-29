import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let timerInterval = setInterval(updateTimer, 1000);
let targetDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    
    if (currentDate > selectedDate) {
      startBtn.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
         } else {
      startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;
flatpickr(datetimePicker, options);

startBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  targetDate = new Date(datetimePicker.value);
  if (new Date() > targetDate) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }
  updateTimer();
  startBtn.disabled = true;
  datetimePicker.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  if (!targetDate) return;
  const timerTime = targetDate - new Date();

  if (timerTime <= 0) {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    datetimePicker.disabled = false;
    return;
  }

  function addleadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  const timeItems = convertMs(timerTime);
  days.textContent = addleadingZero(timeItems.days);
  hours.textContent = addleadingZero(timeItems.hours);
  minutes.textContent = addleadingZero(timeItems.minutes);
  seconds.textContent = addleadingZero(timeItems.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
