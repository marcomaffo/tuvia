import Enemy from './enemy';
import { GameOptions } from '../game';

export default class Stone extends Enemy {
  constructor(left: number, top: number, options: GameOptions) {
    super(left, top, 8, 11, 1, options);
  }

  update(elapsedMillis: number) {
    this.position.y += 2;
  }

  draw() {
    this.options.canvasContext.drawImage(this.tileSheet, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return false;
  }
}
