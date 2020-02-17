export class Create {
    constructor(tabSelector, action) {
        this.selector = tabSelector;
        this.menuElements = document.querySelectorAll(this.selector);
        this.action = action;
        this.bindAll();
    }

    bindAll() {
        for (let max = this.menuElements.length-1; max >= 0; --max) {
            this.menuElements[max].addEventListener('click', this.change.bind(this), false);
        }
    }

    clear() {
        for (let max = this.menuElements.length-1; max >= 0; --max) {
            this.menuElements[max].classList.remove('active');
        }
    }

    change(e) {
        this.clear();
        let tabIndex = Array.from(this.menuElements).indexOf(e.currentTarget);
        // e.currentTarget.classList.add('active');
        typeof this.action === 'function' && this.action(e.currentTarget, tabIndex);
        console.log()
        // e.target.classList.add('active');
        // var id = e.currentTarget.getAttribute('data-tab');
        // document.getElementById(id).classList.add('active');
    }
}
// let res = new Tabs('.portfolio-sections li');