import Page from './page.js'
import Scene from '../scene/scene'

export default class GamePage extends Page {
    constructor(callbacks) {
        // this.callbacks = callbacks;
        super();
        this.show = super.show.bind(this);
        this.hide = super.hide.bind(this);
    }
    init() {
        this.initGameCanvas();
    }

    initGameCanvas() {
        const ratio = window.innerHeight / window.innerWidth;
    }
}