class Carousel {
  constructor() {
    this.carouselImages = document.querySelectorAll(".carousel-image");
    this.activeIndex = 0;
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.tabItems = document.querySelectorAll(".gray-circle");
    this.direction = "right";
    this.iaAnimationOn = false;
  }

  init() {
    this.addEventListenerAtBtns();
    this.addImageTransitionEndEvent();
    this.updateState();
  }
  setIsAnimationOn(boolean) {
    this.iaAnimationOn = boolean;
  }
  updateState() {
    console.log({ index: this.activeIndex });
    this.carouselImages[this.activeIndex].classList.add("active");
    !this.isLastIndex() &&
      this.carouselImages[this.activeIndex + 1].classList.add("next");
    !this.isFirstIndex() &&
      this.carouselImages[this.activeIndex - 1].classList.add("prev");
    this.tabItems[this.activeIndex].classList.add("active-tab");
  }
  addImageTransitionEndEvent() {
    for (const image of this.carouselImages) {
      image.addEventListener("transitionend", (e) => {
        if (e.propertyName === "transform") {
          this.setIsAnimationOn(false);
        }
      });
    }
  }
  initializeState() {
    this.carouselImages[this.activeIndex].classList.remove("active");
    this.carouselImages[0].classList.remove("initial");
    this.tabItems[this.activeIndex].classList.remove("active-tab");
    !this.isLastIndex() &&
      this.carouselImages[this.activeIndex + 1].classList.remove("next");
    !this.isFirstIndex() &&
      this.carouselImages[this.activeIndex - 1].classList.remove("prev");
  }
  addEventListenerAtBtns() {
    const setActiveIndex = (direction) => () => {
      if (
        this.iaAnimationOn ||
        (direction === "left" && this.isFirstIndex()) ||
        (direction === "right" && this.isLastIndex())
      )
        return;
      this.setIsAnimationOn(true);
      this.initializeState();
      this.activeIndex = this.activeIndex + (direction === "left" ? -1 : 1);
      this.updateState();
    };
    this.prevBtn.addEventListener("click", setActiveIndex("left"));
    this.nextBtn.addEventListener("click", setActiveIndex("right"));
  }

  isFirstIndex() {
    return this.activeIndex === 0;
  }
  isLastIndex() {
    return this.activeIndex === this.carouselImages.length - 1;
  }
}

const carousel = new Carousel();
carousel.init();
