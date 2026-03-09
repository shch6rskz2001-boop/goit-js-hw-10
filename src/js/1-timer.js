import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Референси до DOM
const refs = {
  input: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]")
};

let selectedDate = null;
let timerId = null;

// Кнопка старт спочатку неактивна
refs.startBtn.disabled = true;

// Ініціалізація flatpickr
flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      refs.startBtn.disabled = true;

      iziToast.error({
        title: "Error",
        message: "Please choose a date in the future"
      });
    } else {
      refs.startBtn.disabled = false;

      iziToast.success({
        title: "OK",
        message: 'You can press "Start"!'
      });
    }
  }
});

// Обробка кліку по кнопці
refs.startBtn.addEventListener("click", startTimer);

function startTimer() {
  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  timerId = setInterval(() => {
    const timeDiff = selectedDate - new Date();

    if (timeDiff <= 0) {
      clearInterval(timerId);
      updateTimer(0);
      refs.input.disabled = false;
      return;
    }

    updateTimer(timeDiff);
  }, 1000);
}

// Оновлення інтерфейсу таймера
function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

// Додаємо провідний нуль, якщо < 10
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

// Функція конвертації мс у дні, години, хвилини, секунди
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
