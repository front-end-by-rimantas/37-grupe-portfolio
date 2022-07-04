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
        // return this.DOM ? true : false;
    }

    isValidData() {
        if (!Array.isArray(this.data)
            || this.data.length === 0) {
            return false;
        }
        return true;
    }

    render() {
        console.log('piesiam...');
    }

    enableFilter() {
        console.log('ijungiam filtra...');
    }
}

export { Gallery }