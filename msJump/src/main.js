import * as THREE from '../libs/three.js'
window.THREE = THREE
//如果不在 init 这些 import 都不会搞定 import优先级更高
import Game from './game/index.js'


class Main {
    constructor(){
        Game.init();
    }
}

export default new Main();