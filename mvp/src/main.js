import * as THREE from '../libs/three.js'
window.THREE = THREE
import Game from './game/game.js'
GameGlobal.ImageBitmap = function() {}
    class Main {
        constructor () {

        }
        static init() {
            Game.init()
        }
    }

export default Main
