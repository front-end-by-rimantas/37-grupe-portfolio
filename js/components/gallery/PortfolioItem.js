class PortfolioItem {
    constructor(data) {
        this.data = data;
    }

    render() {
        return `<img src="#" alt="Gallery image">
                <div class="overlay">
                    <div class="title">Bulbs</div>
                    <div class="tags">${this.data.tags.map(t => `<p>${t}</p>`).join('')}</div>
                    <div class="actions">
                        <a href="#" class="fa fa-chain-broken"></a>
                        <a href="#" class="fa fa-search-plus"></a>
                    </div>
                </div>`;
    }
}

export { PortfolioItem }