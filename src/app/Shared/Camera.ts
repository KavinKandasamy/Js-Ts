import * as THREE from 'three'
import ThreeDVisualizer from '../Shared/ThreeDVisualizer'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera
{
    threeDVisualizer: any;
    sizes: any;
    scene: any;
    canvas: any;

    controls: any;
  instance!: THREE.PerspectiveCamera;
    constructor(_scene: any, _canvas: any)
    {
        this.threeDVisualizer = new ThreeDVisualizer()
        this.sizes = this.threeDVisualizer.sizes
        this.scene = _scene
        this.canvas = _canvas

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(6, 4, 8)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}
