import { intervalToDuration, isValid, parse } from "../../_snowpack/pkg/date-fns.js";

const form = document.getElementById("form");

const allInputs = document.querySelectorAll("input");
const yearEl = document.querySelector(".display--years");
const monthEl = document.querySelector(".display--months");
const daysEl = document.querySelector(".display--days");

let yearFormInput = document.querySelector(".form__input-year");
let monthFormInput = document.querySelector(".form__input-month");
let dayFormInput = document.querySelector(".form__input-day");

const errors = [
  "Must be a valid day",
  "Must be a valid month",
  "Must be in the past",
];

let speed = 10;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let yearValue = yearFormInput.value;
  let monthValue = monthFormInput.value;
  let dayValue = dayFormInput.value;

  // check if every input is valid
  const isEveryInputValid = Array.from(allInputs).every(
    (input) => input.value === ""
  );

  if (isEveryInputValid) {
    showErrors("required field");
    return;
  } else {
    hideErrors();
  }

  // check if date is valid

  const isvalidDate = parse(
    `${dayValue}, ${monthValue}, ${yearValue}`,
    "dd, MM, yyyy",
    new Date()
  );

  if (!isValid(isvalidDate)) {
    showErrors("invalid date");
    return;
  }

  if (Number(yearValue) > new Date().getFullYear()) {
    showErrors("invalid date");
    showErrors("required field");
    return;
  }

  // Calculate the date

  const start = new Date(`${yearValue}, ${monthValue}, ${dayValue}`);
  const end = new Date();

  const age = intervalToDuration({ start, end });

  const { years, months, days } = age;

  animate(yearEl, years);
  animate(monthEl, months);
  animate(daysEl, days);

  form.reset();
});

function showErrors(errorType) {
  switch (errorType) {
    case "required field":
      allInputs.forEach((input) => {
        input.classList.add("error");
        input.closest(".form__group").firstElementChild.classList.add("error");
        input.closest(".form__group").lastElementChild.classList.add("show");
      });
      break;
    case "invalid date":
      allInputs.forEach((input, index) => {
        input.closest(".form__group").lastElementChild.textContent =
          errors[index];
      });

      Array.from(allInputs)[0].closest(
        ".form__group"
      ).lastElementChild.textContent = "Must be a valid date";
      Array.from(allInputs)[0]
        .closest(".form__group")
        .lastElementChild.classList.add("show");
      break;
    default:
      allInputs.forEach((input) => {
        input.classList.add("error");
        input.closest(".form__group").firstElementChild.classList.add("error");
        input.closest(".form__group").lastElementChild.classList.add("show");
      });
  }
}

function hideErrors() {
  allInputs.forEach((input) => {
    if (input.value) {
      input.classList.remove("error");
      input.closest(".form__group").firstElementChild.classList.remove("error");
      input.closest(".form__group").lastElementChild.classList.remove("show");
    } else {
      input.classList.add("error");
      input.closest(".form__group").firstElementChild.classList.add("error");
      input.closest(".form__group").lastElementChild.classList.add("show");
    }
  });
}

// some animations

function animate(elt, endNbr) {
  incNbrRec(0, endNbr, elt);
}

/*A recursive function to increase the number.*/
function incNbrRec(i, endNbr, elt) {
  if (i <= endNbr) {
    elt.textContent = i;
    setTimeout(function () {
      //Delay a bit before calling the function again.
      incNbrRec(i + 1, endNbr, elt);
    }, speed);
  }
}
