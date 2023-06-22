import * as THREE from 'three'
import Debug from './Debug'
import Resources from './Resources'
import Sizes from './Sizes'
import Time from './Time'
import sources from './sources'
import MDPlaneRenderer from '../components/MDPlaneRenderer'
import Display from './Display'



let instance: ThreeDVisualizer | null = null

export default class ThreeDVisualizer
{
    debug: any
    sizes: any
    time: any
    resources: any
    mdPlaneRenderer: any
    angleViewRenderer: any
    depthViewRenderer: any
    unrolledViewRenderer: any
    display: any
    scene: any
    camera: any
    renderer: any

    window: Window | undefined;
  constructor(...args: []) {
    // Singleton
    if (instance) {
      return instance
    }
    instance = this

    // Global access
    //window.threeDVisualizer = this
    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    //this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    //this.camera = new Camera()
    this.mdPlaneRenderer = new MDPlaneRenderer()
    // this.angleViewRenderer = new AngleViewRenderer(_angleviewcanvas, this)
    // this.depthViewRenderer = new DepthViewRenderer(_depthviewcanvas, this)
    // this.unrolledViewRenderer = new UnrolledViewRenderer(_unrolledviewcanvas, this)
    //this.environment = new Environment()
    this.display = new Display()

    // Resize event
    //-- On Resize - callback this method
    this.sizes.on('resize', () => {
      this.resize()
    })

    // Time tick event
    //-- On Tick - callback this method
    this.time.on('tick', () => {
      this.update()
    })
  }

    resize()
    {
        //this.camera.resize()
        this.mdPlaneRenderer.resize()
        this.angleViewRenderer.resize()
        this.depthViewRenderer.resize()
        this.unrolledViewRenderer.resize()
    }

    update()
    {

        this.display.update()
        this.mdPlaneRenderer.update()
        this.angleViewRenderer.update()
        this.depthViewRenderer.update()
        this.unrolledViewRenderer.update()
    }

    //-- TODO - Need to fix
    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child: { geometry: { dispose: () => void }; material: { [x: string]: any } }) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}
