import { GameOptions } from '../game';
import Enemy from './enemy';
export default class FireBoss3 extends Enemy {
  direction: 1 | -1;
  texture: HTMLImageElement;

  constructor(left: number, top: number, direction: 1 | -1, options: GameOptions) {
    super(left, top, 20, 20, 1, options);
    this.direction = direction;
  }

  loadContent(texture: HTMLImageElement) {
    this.texture = texture;
  }

  update(elapsedMillis: number) {
      this.position.x += this.direction * 5;
  }

  draw() {
    const source = (this.direction === -1) ? 0 : 1;
    this.options.canvasContext.drawImage(this.texture, 0, source * 20, 20, 20, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return false;
  }
}
