import Enemy from './enemy';
import { GameOptions } from '../game';

export default class WalkingEnemy extends Enemy {
  timeSinceLastStateChange = 0;
  walkingDirection: 1 | -1 = 1;
  walkingState = 0;
  leftBorder: number;
  rightBorder: number;

  constructor(left: number, top: number, options: GameOptions) {
    super(left, top - 20, 36, 60, 10, options);
    
    this.rightBorder = left + 80;
    this.leftBorder = left - 80;
  }

  update(elapsedMillis: number) {
    this.position.x += this.walkingDirection;
    if (this.position.x < this.leftBorder || this.position.x > this.rightBorder) {
      this.walkingDirection *= -1;
    }
    this.timeSinceLastStateChange += elapsedMillis;
    if (this.timeSinceLastStateChange > 200) {
      this.timeSinceLastStateChange -= 200;
      this.walkingState = (this.walkingState + 1) % 4;
    }
  }

  draw() {
    let direction: number;
    if (this.walkingDirection > 0) {
      direction = 60;
    } else {
      direction = 0;
    }
    let toDrawImage: HTMLCanvasElement | HTMLImageElement = this.tileSheet;
    if (this.lastShot > 0) {
      toDrawImage = this.coloredTileSheet;
      this.lastShot--;
    }
    this.options.canvasContext.drawImage(toDrawImage, this.walkingState * 36, direction, 36, 60, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return true;
  }
}
