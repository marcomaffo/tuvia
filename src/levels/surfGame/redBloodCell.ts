import { GameOptions } from "../../game";
import SurfEnemy from "./surfEnemy";

export default class RedBloodCell extends SurfEnemy {
  constructor(speed: number, posX: number, options: GameOptions) {
    super(speed, posX, options);
    this.speed = speed;
  }

  update(elapsedMillis: number) {
    this.posY += this.speed;
  }
}
