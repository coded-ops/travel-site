import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';

new MobileMenu();

new RevealOnScroll(document.querySelectorAll('.feature-item'), 75);
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60);

// accept the hot updates if it makes sense to accept them
if (module.hot) {
    module.hot.accept();
}