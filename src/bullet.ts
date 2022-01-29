import { GameOptions } from "./game";
import Rectangle from "./rectangle";

export default class Bullet {
  posX: number;
  posY: number;
  direction: number;
  texture: HTMLImageElement;
  position: Rectangle;
  posOnScreen: Rectangle = new Rectangle(0, 0, 7, 5);
  options: GameOptions;

  constructor(posX: number, posY: number, direction: number, texture: HTMLImageElement, options: GameOptions) {
    this.posX = posX;
    this.posY = posY;
    this.texture = texture;
    this.position = new Rectangle(0, posY, 7, 5);
    this.options = options;
  
    if (direction == 0) {
      this.direction = 1;
      this.position.x = posX;
    } else {
      this.position.x = posX - 30;
      this.direction = -1;
    }
  }

  update(elapsedMillis: number) {
    this.position.x += 7 * this.direction;
  }

  draw() {
    this.options.canvasContext.drawImage(this.texture ,this.posOnScreen.x, this.posOnScreen.y, this.posOnScreen.width, this.posOnScreen.height);
  }
}
