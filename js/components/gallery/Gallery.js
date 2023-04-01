class Gallery {
    constructor(selector, data, itemClass) {
        this.selector = selector;
        this.data = data;
        this.itemClass = itemClass;

        this.DOM = null;
        this.lightboxDOM = null;
        this.backgroundDOM = null;
        this.closeDOM = null;
        this.previousDOM = null;
        this.nextDOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()
            || !this.findTargetElement()
            || !this.isValidData()) {
            throw new Error('Klaida su galerijos duomenimis');
        }

        this.render();
        this.enableFilter();
        this.enableLightbox();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string'
            || this.selector === '') {
            throw new Error('Nevalidus selektorius');
        }
        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    isValidData() {
        if (!Array.isArray(this.data.list)
            || this.data.list.length === 0) {
            throw new Error('Nevalidus duomenys');
        }
        return true;
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    }

    filterHTML() {
        let HTML = '<li class="option active">All</li>';
        const uniqueTags = [];

        for (const { tags } of this.data.list) {
            for (const tag of tags) {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            }
        }

        uniqueTags.sort();

        for (const tag of uniqueTags) {
            HTML += `<li class="option">${this.capitalize(tag)}</li>`;
        }

        return HTML;
    }

    contentHTML() {
        let HTML = '';

        for (const itemData of this.data.list) {
            const itemObject = new this.itemClass(itemData, this.data.imgFolder);
            HTML += `<div class="item">
                        ${itemObject.render()}
                    </div>`;
        }

        return HTML;
    }

    render() {
        this.DOM.innerHTML = `
            <ul class="filter">${this.filterHTML()}</ul>
            <div class="content">${this.contentHTML()}</div>
            <div class="lightbox">
                <div class="background"></div>
                <button class="previous fa fa-caret-left"></button>
                <div class="content">
                    <img src="./img/portfolio/1b.jpg" alt="">
                    <button class="close fa fa-times"></button>
                    <div class="pagination">
                        <span class="current">1</span> of <span class="total">6</span>
                    </div>
                </div>
                <button class="next fa fa-caret-right"></button>
            </div>`;

        this.lightboxDOM = this.DOM.querySelector('.lightbox');
        this.backgroundDOM = this.lightboxDOM.querySelector('.background');
        this.closeDOM = this.lightboxDOM.querySelector('.close');
        this.previousDOM = this.lightboxDOM.querySelector('.previous');
        this.nextDOM = this.lightboxDOM.querySelector('.next');
    }

    optionAction(event) {
        const tagName = event.target.textContent.toLowerCase();
        const contentItemsDOM = this.DOM.querySelectorAll('.content > .item');

        for (let i = 0; i < this.data.list.length; i++) {
            const itemDOM = contentItemsDOM[i];
            const itemData = this.data.list[i];
            if (itemData.tags.includes(tagName) || tagName === 'all') {
                itemDOM.classList.remove('hide');
            } else {
                itemDOM.classList.add('hide');
            }
        }
    }

    enableFilter() {
        const filterDOM = this.DOM.querySelector('.filter');
        const filterOptionsDOM = filterDOM.querySelectorAll('.option');

        for (const optionDOM of filterOptionsDOM) {
            optionDOM.addEventListener('click', this.optionAction.bind(this));
        }
    }

    hideLightbox() {
        this.lightboxDOM.classList.remove('show');
    }

    enableLightbox() {
        this.closeDOM.addEventListener('click', this.hideLightbox.bind(this));
        this.backgroundDOM.addEventListener('click', this.hideLightbox.bind(this));

        addEventListener('keydown', ({ code }) => {
            if (code === 'Escape') {
                this.hideLightbox();
            }
        });
    }
}

export { Gallery }