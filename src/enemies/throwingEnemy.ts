import Enemy from './enemy';
import RunLevel from '../levels/runLevel';
import { GameOptions } from '../game';

export default class ThrowingEnemy extends Enemy {
  lookingDirection: number;
  level: RunLevel;
  state = 0;
  timeSinceThrow = 0;
  timeSinceStateChange = 0;

  constructor(left: number, top: number, lookingDirection: number, level: RunLevel, options: GameOptions) {
    super(left, top, 45, 37, 5, options);
    
    this.lookingDirection = lookingDirection;
    this.level = level;
  }

  update(elapsedMillis: number) {
    if (this.timeSinceThrow > 2000) {
      this.timeSinceStateChange += elapsedMillis;
      if (this.timeSinceStateChange > 150) {
        this.timeSinceStateChange -= 150;
        this.state = (this.state + 1) % 8;
        if (this.state == 0) {
          this.createStone();
          this.timeSinceThrow = 0;
        }
      }
    } else {
      this.timeSinceThrow += elapsedMillis;
    }
  }

  draw() {
    let toDrawImage: HTMLImageElement | HTMLCanvasElement = this.tileSheet;
    if (this.lastShot > 0) {
      toDrawImage = this.coloredTileSheet;
      this.lastShot--;
    }
    this.options.canvasContext.drawImage(toDrawImage, this.state * 45, this.lookingDirection * 37, 45, 37, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  createStone() {
    this.level.createStone(this.position.x + 4 + (this.lookingDirection * 28), this.position.y + this.position.height);
  }

  isHitable() {
    return true;
  }
}
