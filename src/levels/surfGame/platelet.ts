import { GameOptions } from '../../game';
import SurfEnemy from './surfEnemy';
import SurfLevel from './surflevel';

export default class Platelet extends SurfEnemy {
  level: SurfLevel;
  direction: number;
  constructor(speed, posX, level, direction, options: GameOptions) {
    super(speed, posX, options);
    this.level = level;
    this.direction = direction;
  }


  update(elapsedMillis: number) {
    this.posY += this.speed;
    this.posX += this.direction * 4;
    if (this.posX - this.radius < this.level.leftBorder) {
      this.posX = this.level.leftBorder + this.radius;
      this.direction = 1;
    } else if (this.posX + this.radius > this.level.rightBorder) {
      this.posX = this.level.rightBorder - this.radius;
      this.direction = -1;
    }
  }
}
