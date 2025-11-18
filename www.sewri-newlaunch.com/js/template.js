
class Heading extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `
        <div data-tab='tab'>
    </div>
        `
    }
}

customElements.define('tab-menu', Heading)



