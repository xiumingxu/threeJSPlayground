
import Controller from './controller.js'



class Game {
    constructor(props) {
        this.init();
    }
    init(){
        const controller = this.controller = new Controller();
        controller.init();
    }
    run(){
    }
}

export default new Game();