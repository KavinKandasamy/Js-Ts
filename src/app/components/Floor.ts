import * as THREE from 'three'
import ThreeDVisualizer from '../Shared/ThreeDVisualizer'

export default class Floor {
  renderer: any;
  scene: any;
  resources: any;
  geometry!: THREE.CircleGeometry;
  textures: any;
  material!: THREE.MeshStandardMaterial;
  mesh!: THREE.Mesh<any, any>;
  threeDVisualizer: ThreeDVisualizer;
  constructor(_renderer: any) {
    this.threeDVisualizer = new ThreeDVisualizer();
    this.renderer = _renderer;
    this.scene = this.renderer.scene;
    this.resources = this.threeDVisualizer.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }
  canvas1 = document.getElementById('c1') as HTMLCanvasElement;

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
