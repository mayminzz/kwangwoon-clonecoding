// header

const header = document.querySelector("header");
const detailMenuLists = document.querySelectorAll(".detail_menu_list");
const header_bot = document.querySelector(".header_bot");

detailMenuLists.forEach((menuList) => {
  menuList.addEventListener("mouseover", (e) => {
    const targetItem = e.currentTarget.querySelector("h3");
    targetItem.classList.add("active");
  });
  menuList.addEventListener("mouseleave", (e) => {
    const targetItem = e.currentTarget.querySelector("h3");
    targetItem.classList.remove("active");
  });
});

const topMenus = document.querySelectorAll(".top_menu > li > a");

topMenus.forEach((topMenu) => {
  topMenu.addEventListener("click", (e) => {
    e.preventDefault();
    const targetItem = e.currentTarget.parentNode.querySelector(
      ".detail_menu_wrapper"
    );
    const detailMenuBoxes = document.querySelectorAll(".detail_menu_wrapper");
    detailMenuBoxes.forEach((detailMenuBox) => {
      detailMenuBox.classList.remove("active");
    });
    targetItem.classList.add("active");
    header_bot.classList.add("shadow");
  });
  header.addEventListener("mouseleave", (e) => {
    e.preventDefault();
    const targetItems = e.currentTarget.parentNode.querySelectorAll(
      ".detail_menu_wrapper"
    );
    targetItems.forEach((targetItem) => {
      targetItem.classList.remove("active");
    });

    header_bot.classList.remove("shadow");
  });
});

//header fix
const headerBottom = document.querySelector(".header_bot");

let scrollNum = 0;
let documentHeight = 0;

window.addEventListener("scroll", () => {
  scrollNum = window.scrollY;
  if (scrollNum > 94) {
    headerBottom.classList.add("scroll");
  } else {
    headerBottom.classList.remove("scroll");
  }
});
// search
const search_sorts = document.querySelectorAll(".search_form > li");

search_sorts.forEach((sort) => {
  sort.addEventListener("click", (e) => {
    const targetItem = e.currentTarget;
    const siblingItems = e.currentTarget.parentNode.querySelectorAll("li");
    console.log(siblingItems);
    siblingItems.forEach((siblingItem) => {
      siblingItem.classList.remove("on");
    });
    targetItem.classList.add("on");
  });
});

//event Slide
const slideContainer = document.querySelector(".eventZone_inner > ul");
const slides = document.querySelectorAll(".eventZone_inner ul li");
const slideCount = slides.length;

const prevBtn = document.querySelector(".prev_btn");
const nextBtn = document.querySelector(".next_btn");

const pagerBtns = document.querySelectorAll(".current_page");

let currentIndex = 0;

const goToSlide = (i) => {
  slideContainer.style.transform = `translateX(${i * -438}px)`;
  slideContainer.classList.add("animated");
  currentIndex = i;

  for (let i = 0; i < pagerBtns.length; i++) {
    pagerBtns[i].classList.remove("active");
  }
  pagerBtns[i].classList.add("active");
};

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slideCount - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
});

let timer = undefined;
const autoSlide = () => {
  if (timer === undefined) {
    timer = setInterval(() => {
      if (currentIndex < slideCount - 1) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(0);
      }
    }, 2500);
  }
};

autoSlide();

// bookList
const result = document.querySelector(".book_list_slides");
const url = "./book.json";

fetch(url)
  .then((response) => response.json())
  .then((json) => {
    let newOutput = "";

    json.newBook.forEach((book) => {
      newOutput += `
    <li class="book_list_slide" data-index="${book.index}">
      <a href="#">
        <span class="book_cover">
          <img src="${book.img}" alt="${book.alt}" />
        </span>
        <span class="title">
        ${book.title}</span>
        <span class="writer">${book.writer}</span>
      </a>
    </li>
    `;
    });
    result.innerHTML = newOutput;

    let popularOutput = "";
    json.popularBook.forEach((book) => {
      popularOutput += `
      <li class="book_list_slide" data-index="${book.index}">
        <a href="#">
          <span class="book_cover">
            <img src="${book.img}" alt="${book.alt}" />
          </span>
          <span class="title">
          ${book.title}</span>
          <span class="writer">${book.writer}</span>
        </a>
      </li>
      `;
    });

    let EBookOutput = "";
    json.ebook.forEach((book) => {
      EBookOutput += `
      <li class="book_list_slide" data-index="${book.index}">
        <a href="#">
          <span class="book_cover">
            <img src="${book.img}" alt="${book.alt}" />
          </span>
          <span class="title">
          ${book.title}</span>
          <span class="writer">${book.writer}</span>
        </a>
      </li>
      `;
    });

    const categoryBtns = document.querySelectorAll(".book_contents > li > a");

    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const currentTarget = e.currentTarget;

        categoryBtns.forEach((btn) => {
          btn.classList.remove("on");
        });
        currentTarget.classList.add("on");

        if (currentTarget.innerText === "신착도서") {
          result.innerHTML = newOutput;
        } else if (currentTarget.innerText === "인기도서") {
          result.innerHTML = popularOutput;
        } else if (currentTarget.innerText === "NEW E-Book") {
          result.innerHTML = EBookOutput;
        }
      });
    });

    //book slide
    const BookSlides = result.querySelectorAll(".book_list_slide");
    const BookSlideCount = BookSlides.length;

    const BookPrevBtn = document.querySelector(".book_slide_prev");
    const BookNextBtn = document.querySelector(".book_slide_next");

    let BookCurrentIndex = 0;
    let isPaused = false;

    const BookSlider = (i) => {
      result.style.left = `${i * -20}%`;
      result.classList.add("animated");
      BookCurrentIndex = i;
    };

    BookPrevBtn.addEventListener("click", () => {
      if (BookCurrentIndex > 0) {
        BookSlider(BookCurrentIndex - 1);
      } else {
        BookSlider(BookSlideCount - 5);
      }
    });

    BookNextBtn.addEventListener("click", () => {
      if (BookCurrentIndex < BookSlideCount - 5) {
        BookSlider(BookCurrentIndex + 1);
      } else {
        BookSlider(0);
      }
    });

    const startAutoSlide = () => {
      BookTimer = setInterval(() => {
        if (BookCurrentIndex < BookSlideCount - 5) {
          BookSlider(BookCurrentIndex + 1);
        } else {
          BookSlider(0);
        }
      }, 2500); // 2초마다 슬라이드
    };

    const pauseBtn = document.querySelector(".book_slide_pause");
    const pauseImg = document.querySelector(".book_slide_pause img");

    const stopAutoSlide = () => {
      clearInterval(BookTimer);
    };

    pauseBtn.addEventListener("click", () => {
      if (isPaused) {
        startAutoSlide();
        pauseImg.setAttribute("src", "./img/pause.png");
        console.log("play");
      } else {
        stopAutoSlide();
        pauseImg.setAttribute("src", "./img/play.png");
        console.log("pause");
      }
      isPaused = !isPaused;
    });
    startAutoSlide();
  });

//footer
//sitemap
const sitemapBtn = document.querySelector(".sitemap > span");
const siteMenu = document.querySelector(".sitemap_menu_wrapper");

sitemapBtn.addEventListener("click", () => {
  siteMenu.classList.toggle("show");
  sitemapBtn.classList.toggle("active");
});

//relateSite
const relateSiteBtn = document.querySelector(".relate_site > a");
const relateSiteBox = document.querySelector(".relate_site > ul");

relateSiteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  relateSiteBox.classList.toggle("show");
  relateSiteBtn.classList.toggle("active");
});
//familySite
const familySiteBtn = document.querySelector(".family_site > a");
const familySiteBox = document.querySelector(".family_site_box");

familySiteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  familySiteBtn.classList.toggle("active");
  familySiteBox.classList.toggle("show");
});

//mobile
const wholeMenuBtn = document.querySelector(".whole_menu_btn");
const topMenu = document.querySelector(".top_menu");
const closeBtn = document.querySelector(".mobile_object .close");

wholeMenuBtn.addEventListener("click", () => {
  topMenu.classList.add("fadeIn");
});

closeBtn.addEventListener("click", () => {
  topMenu.classList.remove("fadeIn");
});
