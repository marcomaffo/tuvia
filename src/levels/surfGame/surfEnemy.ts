import { GameOptions } from "../../game";

export default abstract class SurfEnemy {
  speed: number;
  posX: number;
  posY: number;
  radius: number;
  sprite: HTMLImageElement;
  options: GameOptions;

  constructor(speed: number, posX: number, options: GameOptions) {
    this.speed = speed;
    this.posX = posX;
    this.options = options;
  }

  loadContent(sprite: HTMLImageElement) {
    this.sprite = sprite;
    this.radius = sprite.width / 2;
    this.posY = (-1 * this.radius);
    this.posX += this.radius;
  }

  draw() {
    this.options.canvasContext.drawImage(this.sprite, this.posX - this.radius, this.posY - this.radius, this.radius * 2, this.radius * 2);
  }

  abstract update(elapsedMillis: number): void;
}
