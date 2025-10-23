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
// تست
// تعریف نوع برای پیشرفت‌بار
interface ProgressBar {
  element: HTMLElement;
  labelElement: HTMLElement;
  targetWidth: number;
  animated: boolean;
}

// کلاس مدیریت پیشرفت‌بارها
class ProgressBarManager {
  private progressBars: ProgressBar[] = [];
  private sectionElement: HTMLElement | null;
  private animationTriggered: boolean = false;

  constructor(sectionSelector: string) {
    this.sectionElement = document.querySelector(sectionSelector);
    this.initializeProgressBars();
    this.setupScrollListener();

    // بررسی اولیه موقعیت
    this.checkScrollPosition();
  }

  // مقداردهی اولیه پیشرفت‌بارها
  private initializeProgressBars(): void {
    const progressContainers = document.querySelectorAll(
      '[role="progressbar"]'
    );

    progressContainers.forEach((container) => {
      const progressElement = container.querySelector(
        "div:last-child"
      ) as HTMLElement;
      const labelElement = container.querySelector(
        "div:first-child span"
      ) as HTMLElement;

      if (progressElement && labelElement) {
        const targetWidth = parseInt(progressElement.style.width) || 0;

        // تنظیم عرض اولیه به 0%
        progressElement.style.width = "0%";

        this.progressBars.push({
          element: progressElement,
          labelElement: labelElement,
          targetWidth: targetWidth,
          animated: false,
        });
      }
    });
  }

  // تنظیم شنونده اسکرول
  private setupScrollListener(): void {
    window.addEventListener("scroll", () => {
      this.checkScrollPosition();
    });

    window.addEventListener("resize", () => {
      this.checkScrollPosition();
    });
  }

  // بررسی موقعیت اسکرول
  private checkScrollPosition(): void {
    if (this.animationTriggered || !this.sectionElement) return;

    const sectionTop = this.sectionElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // اگر بخش در دید قرار گرفت (با فاصله 100px از بالای صفحه)
    if (sectionTop < windowHeight - 100) {
      this.animationTriggered = true;
      this.animateProgressBars();
    }
  }

  // انیمیشن پیشرفت‌بارها
  private animateProgressBars(): void {
    this.progressBars.forEach((bar, index) => {
      // تأخیر برای انیمیشن پلکانی
      setTimeout(() => {
        this.animateProgressBar(bar);
      }, index * 200);
    });
  }

  // انیمیشن یک پیشرفت‌بار
  private animateProgressBar(bar: ProgressBar): void {
    let currentWidth = 0;
    const duration = 1500; // مدت انیمیشن به میلی‌ثانیه
    const increment = bar.targetWidth / (duration / 16); // تقسیم بر 16 برای ~60 فریم بر ثانیه

    const animate = () => {
      currentWidth += increment;

      if (currentWidth >= bar.targetWidth) {
        currentWidth = bar.targetWidth;
        bar.element.style.width = `${currentWidth}%`;
        bar.animated = true;
        return;
      }

      bar.element.style.width = `${currentWidth}%`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}

// راه‌اندازی وقتی DOM کاملاً لود شده
document.addEventListener("DOMContentLoaded", () => {
  new ProgressBarManager("section");
});

// همچنین برای اطمینان از اجرا بعد از لود کامل صفحه
window.addEventListener("load", () => {
  new ProgressBarManager("section");
});

///
