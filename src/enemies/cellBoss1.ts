import { GameOptions } from '../game';
import Enemy from './enemy';

export default class CellBoss1 extends Enemy {
  texture: HTMLImageElement;
  x: number;
  y = 80;
  a: number;
  speedY: number;
  playerPos = 1;

  constructor(left: number, top: number, playerX: number, playerY: number, options: GameOptions) {
    super(left, top, 40, 40, 1, options);
    this.x = left;

    if (playerX - 600.0 > -0.1 && playerX - 600.0 < 0.1) {
        this.a = 0.1;
        this.speedY = 1 / 100.0;
    } else {
      this.speedY = 1 / (Math.abs(playerX - left) / 100.0);
      if (this.speedY > 2) {
        this.speedY = 2;
      }
      if (playerX - 600.0 > 0) {
        this.playerPos = -1;
      }
    }
    this.a = (playerY - 80.0) / ((playerX - 600.0) * (playerX - 600.0));
  }

  loadContent(texture: HTMLImageElement) {
      this.texture = texture;
  }

  update(elapsedMillis: number) {
    this.speedY += 0.2;
    this.y += this.speedY;
    this.x = (600 * this.a - this.playerPos * Math.sqrt(this.a * (-80 + this.y))) / this.a;
    this.position.x = Math.round(this.x);
    this.position.y = Math.round(this.y);
  }

  draw() {
    this.options.canvasContext.drawImage(this.texture, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return false;
  }
}
