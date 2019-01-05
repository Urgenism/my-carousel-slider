const prevBtn = document.querySelector(".carousel__button--prev");
const nextBtn = document.querySelector(".carousel__button--next");
const itemsWrapper = document.querySelector(".carousel__items");
const items = Array.from(itemsWrapper.children);
const item = document.querySelector(".carousel__item");
const indicatorsWrapper = document.querySelector(".carousel__nav");
const indicators = Array.from(indicatorsWrapper.children);

// Arranging items horizontally
let slideWidth = item.getBoundingClientRect().width;

const setSlidePosition = (item, index) => {
  item.style.left = slideWidth * index + "px";
};

items.forEach(setSlidePosition);

const changeCurrentItem = (currentSlide, targetSlide) => {
  itemsWrapper.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const changeCurrentDots = (currentDots, targetDot) => {
  currentDots.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

const hideShowBtn = targetIndex => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === items.length - 1) {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.add("is-hidden");
  } else {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");
  }
};

//previous button functionality
prevBtn.addEventListener("click", () => {
  const currentSlide = itemsWrapper.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = indicatorsWrapper.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = items.findIndex(item => item === prevSlide);

  changeCurrentItem(currentSlide, prevSlide);
  changeCurrentDots(currentDot, prevDot);
  hideShowBtn(prevIndex);
});

//next button functionality
nextBtn.addEventListener("click", () => {
  const currentSlide = itemsWrapper.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = indicatorsWrapper.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = items.findIndex(item => item === nextSlide);

  changeCurrentItem(currentSlide, nextSlide);
  changeCurrentDots(currentDot, nextDot);
  hideShowBtn(nextIndex);
});

//indicator functionality
indicatorsWrapper.addEventListener("click", e => {
  const targetDot = e.target.closest(".carousel__indicator");

  if (!targetDot) return;
  const currentDot = indicatorsWrapper.querySelector(".current-slide");
  const currentSlide = itemsWrapper.querySelector(".current-slide");
  const targetDotIndex = indicators.findIndex(
    indicator => indicator === targetDot
  );
  const targetSlide = items[targetDotIndex];

  changeCurrentDots(currentDot, targetDot);
  changeCurrentItem(currentSlide, targetSlide);
  hideShowBtn(targetDotIndex);
});
