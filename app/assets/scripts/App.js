import '../styles/styles.css';
import MobileMenu from './modules/MobileMenu';

let mobileMenu = new MobileMenu();

// accept the hot updates if it makes sense to accept them
if (module.hot) {
    module.hot.accept();
}