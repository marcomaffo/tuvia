import { GameOptions } from "../../game";
import SurfEnemy from "./surfEnemy";
import SurfLevel from "./surflevel";

export default class CancerCell extends SurfEnemy {
  level: SurfLevel;
  constructor(speed: number, posX: number, level: SurfLevel, options: GameOptions) {
    super(speed, posX, options);
    this.speed = speed;
    this.level = level;
  }

  update(elapsedMillis: number) {
    this.posY += this.speed;
    this.posX += this.level.getNormalizedRelativePositionToPlayer(this.posX);
    if (this.posX - this.radius < this.level.leftBorder) {
        this.posX = this.level.leftBorder + this.radius;
    } else if (this.posX + this.radius > this.level.rightBorder) {
        this.posX = this.level.rightBorder - this.radius;
    }
  }
}
