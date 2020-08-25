import { scene } from '../scene/index'
import Cuboid from '../block/cuboid'
import Cylinder from '../block/cylinder'
import ground from '../objects/ground'
import bottle from '../objects/bottle'

export default class GamePage {
    constructor (callbacks) {
        this.callbacks = callbacks
        this.targetPosition = {}
    }

    init () {
        this.scene = scene
        this.ground = ground
        this.bottle = bottle
        this.scene.init()
        this.ground.init()
        this.bottle.init()
        this.addInitBlock()
        this.addGround()
        this.addBottle()
        this.bindTouchEvent()
        this.render()
    }

    bindTouchEvent () {
        canvas.addEventListener('touchstart', this.touchStartCallback)
        canvas.addEventListener('touchend', this.touchEndCallback)
    }

    removeTouchEvent () {
        canvas.removeEventListener('touchstart', this.touchStartCallback)
        canvas.removeEventListener('touchend', this.touchEndCallback)
    }

    touchStartCallback = (e) => {
        this.touchStartTime = Date.now()
        this.bottle.shrink()
    }

    touchEndCallback = (e) => {
        this.touchEndTime = Date.now()
        const duration = this.touchEndTime - this.touchStartTime
        this.bottle.velocity.vx = Math.min(duration / 6, 400)
        this.bottle.velocity.vx = +this.bottle.velocity.vx.toFixed(2)
        this.bottle.velocity.vy = Math.min(150 + duration / 20, 400)
        this.bottle.velocity.vy = +this.bottle.velocity.vy.toFixed(2)
        this.bottle.stop()
        // this.bottle.rotate()
        this.bottle.jump(duration)
    }

    setDirection (direction) {
        const currentPosition = {
          x: this.bottle.obj.position.x, 
          z: this.bottle.obj.position.z
        }
        this.axis = new THREE.Vector3(this.targetPosition.x - currentPosition.x, 0, this.targetPosition.z - currentPosition.z)
        this.axis.normalize()
        this.bottle.setDirection(direction, this.axis)
    }

    render () {
        this.scene.render()
        if (this.bottle) {
            this.bottle.update()
        }
        requestAnimationFrame(this.render.bind(this))
    }

    addInitBlock() {
        this.cuboidBlock = new Cuboid(-15, 0, 0)
        this.cylinderBlock = new Cylinder(23, 0, 0)
        this.targetPosition = {
            x: 23,
            y: 0,
            z: 0,
        }
        const initPosition = 0
        this.scene.instance.add(this.cuboidBlock.instance)
        this.scene.instance.add(this.cylinderBlock.instance)
        this.setDirection(initPosition)
    }


    addGround () {
        this.scene.instance.add(this.ground.instance)
    }

    addBottle () {
        this.scene.instance.add (this.bottle.obj)
        this.bottle.showup()
    }
}