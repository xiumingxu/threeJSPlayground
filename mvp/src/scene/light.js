class Light {
    constructor () {
        this.instance = {}
    }

    init () {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8) //环境光
        const shadowLight = new THREE.DirectionalLight(0xffffff, 0.3)
        // this.shadowLight = shadowLight
        shadowLight.position.set(10,30,20)

        shadowLight.castShadow = true

        var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xF5f5d5 })
        this.shadowTarget = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1),basicMaterial)
        this.shadowTarget.visible = false
        this.shadowTarget.name = 'shadowTarget'
        shadowLight.target = this.shadowTarget
        shadowLight.shadow.camera.near = 0.5
        shadowLight.shadow.camera.far = 500
        shadowLight.shadow.camera.left = -100
        shadowLight.shadow.camera.right = 100
        shadowLight.shadow.camera.bottom = -100
        shadowLight.shadow.camera.top = 100
        shadowLight.shadow.mapSize.width = 1024
        shadowLight.shadow.mapSize.height = 1024

        this.instance.ambientLight = ambientLight
        this.instance.shadowLight = shadowLight
        this.instance.shadowTarget = this.shadowTarget
    }
}

export default new Light()