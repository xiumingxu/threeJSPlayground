import sceneConf from '../../confs/scene.conf'
import * as THREE from '../../libs/three';
import Camera from './camera';
import Background from '../object/background';

/**
 * 单例模式
 */


export default class Scene{
    static getInstance() {
        if (!this._instance) 
            this._instance =  new Scene();
        return this._instance;
    }

    constructor(){
        this.instance = new THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            preserveDrawingBuffer: true
        })

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap

        this.camera = Camera.getInstance()
        // const helper = new THREE.CameraHelper(this.camera.instance);
        // this.instance.add(helper);

        // this.light = Light.getInstance()

        this.axesHelper = new THREE.AxesHelper(100)

        this.instance.add(this.axesHelper)
        this.instance.add(this.camera.instance)
        // for (let lightType in this.light.instance) {
        //     this.instance.add(this.light.instance[lightType])
        // }

        this.background = Background.getInstance()
        // this.background.init()
        this.background.instance.position.z = -84
        this.camera.instance.add(this.background.instance)
    }



    updateCameraPosition(targetPosition) {
        this.camera.updatePosition(targetPosition)
        // this.light.updatePosition(targetPosition)
    }

    render() {
        this.renderer.render(this.instance, this.camera.instance)
    }

}