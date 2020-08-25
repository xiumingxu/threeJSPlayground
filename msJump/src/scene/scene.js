import sceneConf from '../../confs/scene.conf'
import * as THREE from '../../libs/three';
import Camera from './camera';
import background from '../object/background';
export default class Scene{
    static instance = new Scene();
    constructor(){
        if (!Scene.instance)
            return Scene.instance;
    
        const instance = Scene.instance = THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer(
            {
                antialias: true,
                canvas: canvas,
                preserveDrawingBuffer: true,
            }
        )
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap


        this.camera = Camera.getIntance();
        this.camera.init()

        instance.add(this.camera)
        // for (let lightType in this.light.instances) {
        //     instance.add(this.light.instances[lightType])
        // }
        this.background = background
        this.background.init()
        this.background.instance.position.z = -84
        
        this.camera.instance.add(this.background.instance)
    }


    updateCameraPosition(targetPosition) {
        this.camera.updatePosition(targetPosition)
        // this.light.updatePosition(targetPosition)
    }
}