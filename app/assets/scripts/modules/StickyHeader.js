import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class StickyHeader {

    constructor() {
        this.siteHeader      = document.querySelector('.site-header');
        this.pageSections    = document.querySelectorAll('.page-section');
        this.browserHeight   = window.innerHeight;
        this.previousScrollY = window.scrollY;

        this.events();
    }

    events() {
        // an arrow function so that the 'this' keyword doesn't change.
        // will call runOnScroll every 200ms
        window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200));

        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight;
        }), 333); // 333 - the duration in ms we will wait after the user actually stops resizing the window, then we update the browserHeight.
    }

    runOnScroll() {

        this.determineScrollDirection();

        // window.scrollY - how far down you have scrolled from the very top of the page.
        // So if the user has scrolled down > 60px add the --dark modifier class
        if (window.scrollY > 60) {
            this.siteHeader.classList.add('site-header--dark');
        } else {
            this.siteHeader.classList.remove('site-header--dark');
        }

        // calculate if the current page section has been scrolled to
        this.pageSections.forEach(el => this.calcSection(el))
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down';
        } else {
            this.scrollDirection = 'up';
        }

        this.previousScrollY = window.scrollY;
    }

    calcSection(el) {
        // window.scrollY - how far down you have scrolled from the very top of the page.
        // window.innerHeight - browser view port height.

        // If you've scrolled down far enough that you can at least see the top edge of the page section,
        // And window.scrollY should be < the bottom edge (el.offsetTop + el.offsetHeight) of the page section. So scrollY should have past the section.
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
            let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100;

            // check if you have scrolled down far enough that the section should be highlighted
            // when scrolling down, 18 and -0.1 are tried and abitrary values.
            // when scrolling up, 33 is tried value.
            if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down') || (scrollPercent < 33 && this.scrollDirection == 'up')) {
                let matchingLink = el.getAttribute('data-matching-link');
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove('is-current-link'));
                document.querySelector(matchingLink).classList.add('is-current-link');
            }
        }
    }
}

export default StickyHeader;