import sceneConf from '../../confs/scene.conf'
import * as THREE from '../../libs/three'
// import { customAnimation } from '../../libs/animation'

export default class Camera {

    // TODO need to be done
    static getInstance(){
        if(!this._instance)
             this._instance = new Camera();
        return this._instance;
    }
    constructor() {
        this.init();
    }

    init() {
        const aspect = window.innerHeight / window.innerWidth
        this.instance = new THREE.OrthographicCamera(-sceneConf.frustumSize, sceneConf.frustumSize, sceneConf.frustumSize * aspect, -sceneConf.frustumSize * aspect, -100, 85)
        
        this.instance.position.set(-10, 10, 10)
        this.target = new THREE.Vector3(0, 0, 0)
        this.instance.lookAt(this.target)
    }

    // updatePosition(newTargetPosition) {
    //     customAnimation.to(this.instance.position, 0.5, { x: newTargetPosition.x - 10, y: newTargetPosition.y + 10, z: newTargetPosition.z + 10 })
    //     customAnimation.to(this.target, 0.5, { x: newTargetPosition.x, y: newTargetPosition.y, z: newTargetPosition.z })
    // }

    reset() {
        this.instance.position.set(-10, 10, 10)
        this.target = THREE.Vector3(0, 0, 0)
    }
}
