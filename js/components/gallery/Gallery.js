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
                if (uniqueTags.includes(tag)) {
                    continue;
                }
                uniqueTags.push(tag);
                HTML += `<li class="option">${this.capitalize(tag)}</li>`;
            }
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

    enableFilter() {
        console.log('ijungiam filtra...');
    }
}

export { Gallery }