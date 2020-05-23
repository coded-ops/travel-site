import '../styles/styles.css';
import 'lazysizes';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

new StickyHeader();
new MobileMenu();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);
let modal;

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault(); // so when you click on a link it doesnt try to take you a location of URL with hashtag

        if (typeof modal == 'undefined') {
            // Load in the modal on demand.
            // /* webpackChunkName: 'modal' */ is not required, do this only if you wish to name the bundle being loaded
            // else it uses a default name e.g 0.bundle.js
            import(/* webpackChunkName: 'modal' */ './modules/Modal').then(x => {
                modal = new x.default() // This will create a new instance of our modal class.

                // using setTimeout to give the browser a few msecs before opening the modal
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(
                () => console.log('There was a problem loading the Modal')
            );
        } else {
            modal.openTheModal();
        }
    })
})

// accept the hot updates if it makes sense to accept them
if (module.hot) {
    module.hot.accept();
}