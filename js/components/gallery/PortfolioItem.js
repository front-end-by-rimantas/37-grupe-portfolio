class PortfolioItem {
    constructor(data, folder) {
        this.data = data;
        this.folder = folder;
    }

    render() {
        let folder = this.folder[0] === '/' ? this.folder.slice(1) : this.folder;
        folder = this.folder[this.folder.length - 1] === '/' ? this.folder.slice(0, -1) : this.folder;

        const img = this.data.img[0] === '/' ? this.data.img.slice(1) : this.data.img;

        return `<div class="portfolio-item">
                    <img src="./img/${folder}/${img}" alt="Gallery image">
                    <div class="overlay">
                        <div class="title">Bulbs</div>
                        <div class="tags">${this.data.tags.map(t => `<p>${t}</p>`).join('')}</div>
                        <div class="actions">
                            <a href="#" class="fa fa-chain-broken"></a>
                            <a href="#" class="fa fa-search-plus"></a>
                        </div>
                    </div>
                </div>`;
    }
}

export { PortfolioItem }