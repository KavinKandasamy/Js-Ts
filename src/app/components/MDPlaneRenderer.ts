import * as THREE from 'three'
import Camera from "../Shared/Camera"
import ThreeDVisualizer from '../Shared/ThreeDVisualizer';

export default class MDPlaneRenderer {
  canvas: any;
  scene: THREE.Scene;
  camera: Camera;
  threeDVisualizer: any;
  renderer: any;
  resources: any;
  instance!: THREE.WebGLRenderer;
  geometry!: THREE.CircleGeometry;
  textures!: any;
  material!: THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh<any, any>;
  constructor(...args: []) {
    // this.canvas = _canvas;
    // this.threeDVisualizer = _threeDVisualizer;
    this.scene = new THREE.Scene();
    this.camera = new Camera(this.scene, this.canvas);
    this.setInstance();
  }
  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    //this.instance.physicallyCorrectLights = true;
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor('#211d20');
    this.instance.setSize(
      this.threeDVisualizer.sizes.width / 3,
      this.threeDVisualizer.sizes.height / 2
    );
    this.instance.setPixelRatio(
      Math.min(this.threeDVisualizer.sizes.pixelRatio, 2)
    );
  }

  resize() {
    this.camera.resize();
    this.instance.setSize(
      this.threeDVisualizer.sizes.width / 3,
      this.threeDVisualizer.sizes.height / 2
    );
    this.instance.setPixelRatio(
      Math.min(this.threeDVisualizer.sizes.pixelRatio, 2)
    );
  }

  update() {
    this.camera.update();
    this.threeDVisualizer.display.update();

    this.instance.render(this.scene, this.camera.instance);
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64);
  }

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.color.encoding = THREE.sRGBEncoding;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
