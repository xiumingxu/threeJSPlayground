import * as THREE from '../libs/three.js' 
window.THREE = THREE;
import Game from './game/index.js'


class Main {
    constructor(){
        Game.run();
    }
}

export default new Main();