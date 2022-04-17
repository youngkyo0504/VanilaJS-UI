class Carousel {
    constructor() {
        this.carouselImages = document.querySelectorAll(".carousel-image")
        this.activeIndex = 0;
        this.prevBtn = document.querySelector('.prev-btn')
        this.nextBtn = document.querySelector('.next-btn')
        this.direction = 'right'
    }

    init() {
        this.addEventListenerAtBtns();
        this.setImageState();
    }

    setImageState() {
        console.log({ "index": this.activeIndex })
        this.carouselImages[this.activeIndex].classList.add('active');
        !this.isLastIndex() && this.carouselImages[this.activeIndex + 1].classList.add('next')
        !this.isFirstIndex() && this.carouselImages[this.activeIndex - 1].classList.add('prev')
    }

    initializeState() {
        this.carouselImages[this.activeIndex].classList.remove('active');
        this.carouselImages[0].classList.remove('initial');
        !this.isLastIndex() && this.carouselImages[this.activeIndex + 1].classList.remove('next')
        !this.isFirstIndex() && this.carouselImages[this.activeIndex - 1].classList.remove('prev')
    }
    addEventListenerAtBtns() {
        const setActiveIndex = (change) => (() => {
            if ((change < 0 && this.isFirstIndex()) || (change > 0 && this.isLastIndex())) return;
            this.initializeState()
            this.activeIndex = this.activeIndex + change;
            this.setImageState()
        })
        this.prevBtn.addEventListener('click', setActiveIndex(-1));
        this.nextBtn.addEventListener('click', setActiveIndex(1));
    }

    isFirstIndex() {
        return this.activeIndex === 0;
    }
    isLastIndex() {
        return this.activeIndex === this.carouselImages.length - 1;
    }
}

const carousel = new Carousel()
carousel.init()