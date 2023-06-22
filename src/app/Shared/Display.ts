import Floor from "../components/Floor";
import Environment from "./Environment";
import ThreeDVisualizer from "./ThreeDVisualizer"


export default class Display {
  resources: any;
  floor: any;
  photo: any;
  floor2: any;
  photo2: any;
  environment1: any;
  environment2: any;
  environment3: any;
  environment4: any;
  threeDVisualizer: any;
  constructor() {
    this.resources = this.threeDVisualizer.resources;

    // Wait for resources
    this.resources.on('ready', () => {
      this.floor = new Floor(this.threeDVisualizer.mdPlaneRenderer);
      // this.photo = new Photo(this.threeDVisualizer.angleViewRenderer);
      // this.floor2 = new Floor(this.threeDVisualizer.depthViewRenderer);
      // this.photo2 = new Photo(this.threeDVisualizer.unrolledViewRenderer);
      this.environment1 = new Environment(this.floor.scene);
      // this.environment2 = new Environment(this.photo.scene);
      // this.environment3 = new Environment(this.floor2.scene);
      // this.environment4 = new Environment(this.photo2.scene);
    });
  }

  update() {
    //if(this.fox)
    //    this.fox.update()
  }
}
