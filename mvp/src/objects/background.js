import sceneConf from '../../conf/scene-conf'
class Background {
    constructor () {

    }

    init () {
        const geometry = new THREE.PlaneGeometry(sceneConf.frustumSize * 2 , window.innerHeight / window.innerWidth * sceneConf.frustumSize * 2)
        const meterial = new THREE.MeshBasicMaterial({ 
            color: 0xd7dbe6,
            opacity: 1,
            transparent: true
        })
        this.instance = new THREE.Mesh(geometry, meterial)
    }
}

export default new Background()