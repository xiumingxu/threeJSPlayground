
import Controller from './controller.js'


class Game {
    constructor(props) {
    }
    init(){
        const controller = this.controller = new Controller();
        controller.init();
    }
    run(){
    }
}

export default new Game();