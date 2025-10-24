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
// تعریف نوع برای شمارنده
interface Counter {
  element: HTMLElement;
  targetValue: number;
  animated: boolean;
  duration: number;
}

// کلاس مدیریت شمارنده‌ها
class CounterManager {
  private counters: Counter[] = [];
  private sectionElement: HTMLElement | null;
  private animationTriggered: boolean = false;

  constructor(sectionSelector: string) {
    this.sectionElement = document.querySelector(sectionSelector);
    this.initializeCounters();
    this.setupScrollListener();

    // بررسی اولیه موقعیت
    this.checkScrollPosition();
  }

  // مقداردهی اولیه شمارنده‌ها
  private initializeCounters(): void {
    const counterElements = document.querySelectorAll(
      "h2.text-\\[\\#1dbf73\\]"
    );

    counterElements.forEach((element, index) => {
      const counterElement = element as HTMLElement;
      const targetValue = parseInt(counterElement.textContent || "0");

      // تنظیم مقدار اولیه به 0
      counterElement.textContent = "0";

      this.counters.push({
        element: counterElement,
        targetValue: targetValue,
        animated: false,
        duration: 2000 + index * 500, // مدت انیمیشن با تأخیر پلکانی
      });
    });

    console.log(`Total counters initialized: ${this.counters.length}`);
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

    // اگر بخش در دید قرار گرفت (با فاصله 150px از بالای صفحه)
    if (sectionTop < windowHeight - 150) {
      this.animationTriggered = true;
      this.animateCounters();
    }
  }

  // انیمیشن شمارنده‌ها
  private animateCounters(): void {
    console.log("Starting counter animations");

    this.counters.forEach((counter, index) => {
      // تأخیر برای انیمیشن پلکانی
      setTimeout(() => {
        this.animateCounter(counter);
      }, index * 300);
    });
  }

  // انیمیشن یک شمارنده
  private animateCounter(counter: Counter): void {
    let startValue = 0;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / counter.duration, 1);

      // استفاده از تابع easing برای انیمیشن طبیعی‌تر
      const easeProgress = this.easeOutQuart(progress);
      const currentValue = Math.floor(easeProgress * counter.targetValue);

      counter.element.textContent = currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.element.textContent = counter.targetValue.toString();
        counter.animated = true;
        console.log(`Counter animation completed: ${counter.targetValue}`);
      }
    };

    animate();
  }

  // تابع easing برای انیمیشن طبیعی‌تر
  private easeOutQuart(t: number): number {
    return 1 - Math.pow(1 - t, 4);
  }
}

// راه‌اندازی وقتی DOM کاملاً لود شده
document.addEventListener("DOMContentLoaded", () => {
  new CounterManager("section"); // یا سلکتور بخش مورد نظر
});

// همچنین برای اطمینان از اجرا بعد از لود کامل صفحه
window.addEventListener("load", () => {
  new CounterManager("section");
});
//for filter
// TypeScript types for Portfolio
interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

// Portfolio management class with UL/LI structure
class PortfolioFilterManager {
  private items: PortfolioItem[] = [];
  private filteredItems: PortfolioItem[] = [];
  private portfolioContainer: HTMLElement;
  private filterList: HTMLUListElement;
  private filterItems: NodeListOf<HTMLLIElement>;
  private activeFilter: string = "all";

  constructor(portfolioContainerSelector: string, filterListSelector: string) {
    this.portfolioContainer = document.querySelector(
      portfolioContainerSelector
    ) as HTMLElement;
    this.filterList = document.querySelector(
      filterListSelector
    ) as HTMLUListElement;
    this.filterItems = this.filterList.querySelectorAll("li");

    this.initializePortfolioData();
    this.setupEventListeners();
    this.applyActiveFilter();
  }

  // Initialize portfolio data
  private initializePortfolioData(): void {
    this.items = [
      {
        id: 1,
        title: "Website Design Project",
        category: "web-design",
        image: "../src/img/portfolio-1.jpg",
        description: "Modern and responsive website design",
        tags: ["design", "responsive", "modern"],
      },
      {
        id: 2,
        title: "Mobile App Development",
        category: "app-development",
        image: "../src/img/portfolio-4.jpg",
        description: "Android and iOS mobile app development",
        tags: ["mobile", "android", "ios"],
      },
      {
        id: 3,
        title: "UI/UX Design",
        category: "app-design",
        image: "../src/img/portfolio-6.jpg",
        description: "Professional user experience design",
        tags: ["ui", "ux", "design"],
      },
      {
        id: 4,
        title: "E-commerce Website Development",
        category: "web-development",
        image: "../src/img/portfolio-2.jpg",
        description: "E-commerce website development with advanced features",
        tags: ["ecommerce", "development", "web"],
      },
      {
        id: 5,
        title: "Project Management App",
        category: "app-development",
        image: "../src/img/portfolio-2.jpg",
        description: "Project and task management application",
        tags: ["productivity", "management", "mobile"],
      },
      {
        id: 6,
        title: "Enterprise Portal",
        category: "web-development",
        image: "../src/img/portfolio-4.jpg",
        description: "Enterprise portal development with admin panel",
        tags: ["portal", "admin", "enterprise"],
      },
      {
        id: 7,
        title: "Mobile App",
        category: "app-design",
        image: "../src/img/portfolio-3.jpg",
        description: "Mobile Application Design",
        tags: ["mobile", "design", "interface"],
      },
      {
        id: 8,
        title: "Web Design",
        category: "web-design",
        image: "../src/img/portfolio-5.jpg",
        description: "Modern Website Design",
        tags: ["corporate", "business", "design"],
      },
    ];

    this.filteredItems = [...this.items];
    this.renderPortfolioItems();
  }
  // Set up event listeners for filters
  private setupEventListeners(): void {
    this.filterItems.forEach((liItem, index) => {
      liItem.addEventListener("click", (e) => {
        e.preventDefault();

        // Determine filter based on item text
        let filterValue = "all";
        const textContent = liItem.textContent?.toLowerCase().trim();

        switch (textContent) {
          case "all":
            filterValue = "all";
            break;
          case "web design":
            filterValue = "web-design";
            break;
          case "web development":
            filterValue = "web-development";
            break;
          case "app design":
            filterValue = "app-design";
            break;
          case "app development":
            filterValue = "app-development";
            break;
          default:
            filterValue = "all";
        }

        this.handleFilterChange(filterValue, liItem);
      });

      // Add hover effect
      liItem.addEventListener("mouseenter", () => {
        if (!liItem.classList.contains("active")) {
          liItem.style.backgroundColor = "#1dbf73";
        }
      });

      liItem.addEventListener("mouseleave", () => {
        if (!liItem.classList.contains("active")) {
          liItem.style.backgroundColor = "#353535";
        }
      });
    });
  }

  // Handle filter change
  private handleFilterChange(filter: string, clickedItem: HTMLLIElement): void {
    this.activeFilter = filter;

    // Update filter items style
    this.updateActiveFilterStyle(clickedItem);

    // Apply filter
    this.applyFilter();

    // Render filtered items
    this.renderPortfolioItems();
  }

  // Update active filter style
  private updateActiveFilterStyle(activeItem: HTMLLIElement): void {
    this.filterItems.forEach((item) => {
      item.classList.remove("active");
      item.style.backgroundColor = "#353535";
    });

    activeItem.classList.add("active");
    activeItem.style.backgroundColor = "#1dbf73";
  }

  // Apply filter to items
  private applyFilter(): void {
    if (this.activeFilter === "all") {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(
        (item) => item.category === this.activeFilter
      );
    }
  }

  // Render portfolio items
  private renderPortfolioItems(): void {
    this.portfolioContainer.innerHTML = "";

    if (this.filteredItems.length === 0) {
      this.portfolioContainer.innerHTML = `
                <div class="col-span-3 text-center py-12">
                    <div class="text-gray-500 text-lg">
                        There is no Project in this Category
                    </div>
                </div>
            `;
      return;
    }

    this.filteredItems.forEach((item) => {
      const portfolioItem = this.createPortfolioItemElement(item);
      this.portfolioContainer.appendChild(portfolioItem);
    });
  }

  // Create portfolio item element
  private createPortfolioItemElement(item: PortfolioItem): HTMLElement {
    const itemElement = document.createElement("div");
    itemElement.className =
      "portfolio-item group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl";
    itemElement.setAttribute("data-category", item.category);

    itemElement.innerHTML = `
    <div class="relative overflow-hidden rounded-lg bg-gray-100 group">
        <!-- Image Container with Black Glow -->
        <div class="relative h-48 overflow-hidden drop-shadow-2xl">
            <img src="${item.image}" alt="${item.title}" 
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        </div>
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        <!-- Content -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div class="text-center text-white p-4">
                <h3 class="text-lg font-bold mb-2">${item.title}</h3>
                <p class="text-sm mb-3">${item.description}</p>
                <div class="flex justify-center flex-wrap gap-2 mb-3">
                    ${item.tags
                      .map(
                        (tag) =>
                          `<span class="bg-[#1dbf73] text-xs px-2 py-1 rounded">${tag}</span>`
                      )
                      .join("")}
                </div>
                <button class="view-project bg-white text-[#353535] hover:bg-gray-100 px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                    See Project
                </button>
            </div>
        </div>
    </div>
`;

    // Add event listener for view project button
    const viewButton = itemElement.querySelector(
      ".view-project"
    ) as HTMLElement;
    viewButton.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showProjectDetails(item);
    });

    return itemElement;
  }

  // Show project details
  private showProjectDetails(item: PortfolioItem): void {
    // Create modal for details
    const modal = this.createDetailsModal(item);
    document.body.appendChild(modal);

    // Show modal
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);

    // Close modal on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeModal(modal);
      }
    });

    // Close with close button
    const closeBtn = modal.querySelector(".close-modal") as HTMLElement;
    closeBtn.addEventListener("click", () => {
      this.closeModal(modal);
    });
  }

  // Create details modal
  private createDetailsModal(item: PortfolioItem): HTMLElement {
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 transition-opacity duration-300";

    modal.innerHTML = `
            <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800">${
                          item.title
                        }</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    <img src="${item.image}" alt="${
      item.title
    }" class="w-full h-64 object-cover rounded-lg mb-4">
                    <p class="text-gray-600 mb-4">${item.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${item.tags
                          .map(
                            (tag) =>
                              `<span class="bg-[#1dbf73] text-white px-3 py-1 rounded-full text-sm">${tag}</span>`
                          )
                          .join("")}
                    </div>
                    <div class="border-t pt-4">
                        <h3 class="font-semibold mb-2">Category:</h3>
                        <span class="bg-[#353535] text-white px-3 py-1 rounded text-sm">${this.getCategoryName(
                          item.category
                        )}</span>
                    </div>
                </div>
            </div>
        `;

    return modal;
  }

  // Close modal
  private closeModal(modal: HTMLElement): void {
    modal.classList.remove("active");
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  // Get category name
  private getCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      all: "All",
      "web-design": "Web Design",
      "web-development": "Web Development",
      "app-design": "App Design",
      "app-development": "App Development",
    };

    return categoryMap[category] || category;
  }

  // Apply initial filter
  private applyActiveFilter(): void {
    const allFilter = this.filterList.querySelector("li") as HTMLLIElement;
    if (allFilter) {
      this.handleFilterChange("all", allFilter);
    }
  }
}

// Initialize filter system
document.addEventListener("DOMContentLoaded", () => {
  const portfolioManager = new PortfolioFilterManager(
    "#portfolio-grid", // Portfolio items container selector
    ".portfolio-filters" // Filters list selector
  );
});
