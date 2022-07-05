class Gallery {
    constructor(selector, data) {
        this.selector = selector;
        this.data = data;

        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()
            || !this.findTargetElement()
            || !this.isValidData()) {
            return false;
        }

        this.render();
        this.enableFilter();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string'
            || this.selector === '') {
            return false;
        }
        return true;
    }

    findTargetElement() {
        this.DOM = document.querySelector(this.selector);
        return !!this.DOM;
    }

    isValidData() {
        if (!Array.isArray(this.data)
            || this.data.length === 0) {
            return false;
        }
        return true;
    }

    capitalize(text) {
        return text[0].toUpperCase() + text.slice(1);
    }

    filterHTML() {
        let HTML = '<li class="option active">All</li>';
        const uniqueTags = [];

        for (const { tags } of this.data) {
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

        for (const item of this.data) {
            HTML += `<div class="item">
                        <img src="#" alt="Gallery image">
                        <div class="overlay">
                            <div class="title">Bulbs</div>
                            <div class="tags">${item.tags.map(t => `<p>${t}</p>`).join('')}</div>
                            <div class="actions">
                                <a href="#" class="fa fa-chain-broken"></a>
                                <a href="#" class="fa fa-search-plus"></a>
                            </div>
                        </div>
                    </div>`;
        }

        return HTML;
    }

    render() {
        this.DOM.innerHTML = `
            <ul class="filter">${this.filterHTML()}</ul>
            <div class="content">${this.contentHTML()}</div>`;
    }

    optionAction(event) {
        console.log(this);
        const tagName = event.target.textContent.toLowerCase();
        const contentItemsDOM = this.DOM.querySelectorAll('.content > .item');

        for (let i = 0; i < this.data.length; i++) {
            const itemDOM = contentItemsDOM[i];
            const itemData = this.data[i];
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
}

export { Gallery }