import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {

    constructor(els, thresholdPercent) {
        this.itemsToReveal    = els;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight    = window.innerHeight; // window.innerHeight - browser viewport height in pixels

        this.hideInitially();
        // 200ms in 1s. i.e this.calcCaller is only going to get called 5 times in a sec at most
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener('resize', debounce(() => {
            this.browserHeight = window.innerHeight;
        }), 333); // 333 - the duration in ms we will wait after the user actually stops resizing the window, then we update the browserHeight.
    }

    calcCaller() {
        this.itemsToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el);
            }
        })
    }

    calculateIfScrolledTo(el) {
        // window.scrollY - how far down you have scrolled from the very top of the page

        // if we scroll to the point where the top edge of an element has crossed the very bottom threshold.
        // once that happens thenwe are calculate if it should be revealed or not.
        if ((window.scrollY + this.browserHeight) > el.offsetTop) {
            // el.getBoundingClientRect().y or top - it's a measure of how far the top edge of an element is from the top edge of the current bounding
            // rectangle, in this case the browser's viewport.

            // this will give us the % of how far into the browser viewport the element has been scrolled to.
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;

            // e.g if this.thresholdPercent = 75, this is more like if the element top edge is less than 75% away from top edge of the browser viewport
            if (scrollPercent < this.thresholdPercent) {
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;

                // remove scroll event call after last item has been revealed
                if (el.isLastItem) {
                    window.removeEventListener('scroll', this.scrollThrottle);
                }
            }
        }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add('reveal-item');
            el.isRevealed = false;
        });

        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }

}

export default RevealOnScroll;