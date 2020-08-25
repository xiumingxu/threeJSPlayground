import { customAnimation } from '../../libs/animation'
import bottleConf from '../../conf/bottle-conf'
import blockConf from '../../conf/block-conf'
import gameConf from '../../conf/game-conf'
class Bottle {
    constructor () {
        this.direction = 0
        this.axis = null
        this.status = 'stop'
        this.scale = 1
        this.flyingTime = 0
        this.velocity = {
            vx: 0, // 水平方向速度
            vy: 0 //竖直方向速度
        }
    }

    init () {
        this.loader = new THREE.TextureLoader()
        this.obj = new THREE.Object3D()
        this.obj.name = 'bottle'
        this.obj.position.set(bottleConf.initPosition.x, bottleConf.initPosition.y + 30, bottleConf.initPosition.z)

        const { specularMaterial, bottomMaterial, middleMaterial} = this.loadTexture()

        this.bottle = new THREE.Object3D()
        this.human = new THREE.Object3D()
        const headRadius = bottleConf.headRadius
        
        this.head = new THREE.Mesh(
            new THREE.OctahedronGeometry(headRadius),
            bottomMaterial
        )
        this.head.castShadow = true

        const bottom = new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.62857 * headRadius, 0.907143 * headRadius, 1.91423 * headRadius, 20
            ),
            bottomMaterial
        )

        bottom.castShadow = true


        const middle = new THREE.Mesh(
            new THREE.CylinderGeometry(
                headRadius / 1.4, headRadius / 1.44 * 0.88, headRadius * 1.2, 20
            ),
            middleMaterial
        )

        middle.castShadow = true
        middle.position.y = 1.3857 * headRadius
        middle.position.x = 0
        middle.position.z = 0

        var topGeometry = new THREE.SphereGeometry(headRadius / 1.4, 20, 20)
        topGeometry.scale(1, 0.54, 1)
        var top = new THREE.Mesh(
            topGeometry,
            specularMaterial
        )
        top.castShadow = true
        top.position.y = 1.8143 * headRadius
        top.position.x = 0
        top.position.z = 0

        this.body = new THREE.Object3D()
        this.body.add(bottom)
        this.body.add(middle)
        this.body.add(top)
        
        this.head.position.y = 3.57143 * headRadius
        this.head.position.x = 0
        this.head.position.z = 0
        
        this.human.add(this.head)
        this.human.add(this.body)

        this.bottle.add(this.human)

        this.bottle.position.y = 2.2
        this.bottle.position.x = 0
        this.bottle.position.z = 0
        this.obj.add(this.bottle)
    }

    loadTexture () {

        const specularTexture = this.loader.load('/game/res/images/head.png')
        const specularMaterial = new THREE.MeshBasicMaterial({
            map: specularTexture
        })
        
        const bottomTexture = this.loader.load('/game/res/images/bottom.png')
        const bottomMaterial = new THREE.MeshBasicMaterial({
            map: bottomTexture
        })

        const middleTexture = this.loader.load('/game/res/images/top.png')
        const middleMaterial = new THREE.MeshBasicMaterial({
            map: middleTexture
        })

        return { specularMaterial, bottomMaterial, middleMaterial}
    }

    _shrink () {
        const MIN_SCALE = 0.55
        const HORIZON_DELTA_SCALE = 0.007
        const DELTA_SCALE = 0.005
        const HEAD_DELTA = 0.03

        this.scale -= DELTA_SCALE
        this.scale = Math.max(MIN_SCALE, this.scale)
        if(this.scale <= MIN_SCALE){
            return
        }

        this.body.scale.y = this.scale
        this.body.scale.x += HORIZON_DELTA_SCALE
        this.body.scale.z += HORIZON_DELTA_SCALE
        this.head.position.y -= HEAD_DELTA

        const bottleDeltaY = HEAD_DELTA / 2
        const deltaY = blockConf.height * DELTA_SCALE / 2
        // this.obj.position.y -= (bottleDeltaY + deltaY * 2)
        this.obj.position.y -= bottleDeltaY
    }

    update () {
        if (this.status == 'shrink') {
          this._shrink()
        } else if (this.status == 'jump') {
          const tickTime = Date.now() - this.lastFrameTime
          this._jump(tickTime)
        }
        this.head.rotation.y += 0.06
        this.lastFrameTime = Date.now()
    }

    showup () {
        // console.log(customAnimation)
        customAnimation.to(0.6,this.obj.position, {
            x: bottleConf.initPosition.x,
            y: bottleConf.initPosition.y + blockConf.height / 2,
            z: bottleConf.initPosition.z
        }, 'BounceEaseOut')
    }

    setDirection (direction, axis) {
        this.direction = direction
        this.axis = axis
    }

    shrink () {
        this.status = 'shrink' 
    }

    stop () {
        this.status = 'stop'
        this.velocity = {
          vx: 0, // 水平方向速度
          vy: 0 //竖直方向速度
        }
        this.flyingTime = 0
        this.scale = 1
    }

    jump (duration) {
        this.status = 'jump'
    }

    
    _jump (tickTime) {
        const t = tickTime / 1000
        this.flyingTime = this.flyingTime + t
        const translateH = this.velocity.vx * t
        const translateY = this.velocity.vy * t - 0.5 * gameConf.gravity * t * t - gameConf.gravity * this.flyingTime * t
        this.obj.translateY(translateY)
        this.obj.translateOnAxis(this.axis, translateH)
      }

    rotate () {
        const scale = 1.4
        this.human.rotation.z = this.human.rotation.x = 0
        if (this.direction == 0) { // x
            customAnimation.to(0.14, this.human.rotation, { z: this.human.rotation.z - Math.PI })
            customAnimation.to(0.18, this.human.rotation, { z: this.human.rotation.z - 2 * Math.PI }, 'Linear', 0.14)
            customAnimation.to(0.1, this.head.position, { y: this.head.position.y + 0.9 * scale, x: this.head.position.x + 0.45 * scale })
            customAnimation.to(0.1, this.head.position, { y: this.head.position.y - 0.9 * scale, x: this.head.position.x - 0.45 * scale}, 'Linear', 0.1)
            customAnimation.to(0.15, this.head.position, { y: 7.56, x: 0 }, 'Linear', 0.25)
            customAnimation.to(0.1, this.body.scale, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
            customAnimation.to(0.1, this.body.scale, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2)}, 'Linear', 0.1)
            customAnimation.to(0.3, this.body.scale, { y: 1, x: 1, z: 1 }, 'Linear', 0.2)
        } else if (this.direction == 1) { // z
            customAnimation.to(this.human.rotation, 0.14, { x: this.human.rotation.x - Math.PI })
            customAnimation.to(this.human.rotation, 0.18, { x: this.human.rotation.x - 2 * Math.PI }, 'Linear', 0.14)
            customAnimation.to(this.head.position, 0.1, { y: this.head.position.y + 0.9 * scale, z: this.head.position.z - 0.45 * scale })
            customAnimation.to(this.head.position, 0.1, { z: this.head.position.z + 0.45 * scale, y: this.head.position.y - 0.9 * scale }, 'Linear', 0.1)
            customAnimation.to(this.head.position, 0.15, { y: 7.56, z: 0 }, 'Linear', 0.25)
            customAnimation.to(this.body.scale, 0.05, { y: Math.max(scale, 1), x: Math.max(Math.min(1 / scale, 1), 0.7), z: Math.max(Math.min(1 / scale, 1), 0.7) })
            customAnimation.to(this.body.scale, 0.05, { y: Math.min(0.9 / scale, 0.7), x: Math.max(scale, 1.2), z: Math.max(scale, 1.2)}, 'Linear', 0.1)
            customAnimation.to(this.body.scale, 0.2, { y: 1, x: 1, z: 1 }, 'Linear', 0.2)
        }
    }
}

export default new Bottle()