import "./style.css";
const allSlidesEl = document.querySelectorAll(".slides");
const mainColor = document.querySelectorAll(".main");
const backBtnEl = document.getElementById("prev") as HTMLButtonElement;
const nextBtnEl = document.getElementById("next") as HTMLButtonElement;
let interval: number;
//  اسلایدر
const next = (): void => {
  const currentEl = document.querySelector(".current");
  const changeColorEl = document.querySelector(".changeColor");
  currentEl?.classList.remove("current");
  changeColorEl?.classList.remove("changeColor");
  if (currentEl?.nextElementSibling && changeColorEl?.nextElementSibling) {
    currentEl.nextElementSibling.classList.add("current");
    changeColorEl.nextElementSibling.classList.add("changeColor");
  } else {
    allSlidesEl[0].classList.add("current");
    mainColor[0].classList.add("changeColor");
  }
};
const back = (): void => {
  const currentEl = document.querySelector(".current");
  const changeColorEl = document.querySelector(".changeColor");
  currentEl?.classList.remove("current");
  changeColorEl?.classList.remove("changeColor");
  if (
    currentEl?.previousElementSibling &&
    changeColorEl?.previousElementSibling
  ) {
    currentEl.previousElementSibling.classList.add("current");
    changeColorEl.previousElementSibling.classList.add("changeColor");
  } else {
    allSlidesEl[allSlidesEl.length - 1].classList.add("current");
    mainColor[mainColor.length - 1].classList.add("changeColor");
  }
};

nextBtnEl.addEventListener("click", () => {
  next();
  if (true) {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }
});
backBtnEl.addEventListener("click", () => {
  back();
  if (true) {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }
});
if (true) {
  interval = setInterval(next, 5000);
}
