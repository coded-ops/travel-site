class MobileMenu {

    constructor() {
        this.menuIcon    = document.querySelector('.site-header__menu-icon');
        this.menuContent = document.querySelector('.site-header__menu-content');
        this.siteHeader  = document.querySelector('.site-header');

        this.events();
    }

    // Since an arrow function doesn't manipulate the 'this' keyword.
    // When the event is called the 'this' context will still be pointing to the object.
    events() {
        this.menuIcon.addEventListener('click', () => this.toggleTheMenu());
    }

    toggleTheMenu() {
        this.menuContent.classList.toggle('site-header__menu-content--is-visible');
        this.siteHeader.classList.toggle('site-header--is-expanded');

        this.menuIcon.classList.toggle('site-header__menu-icon--close-x');
    }
}

export default MobileMenu;