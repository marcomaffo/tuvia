import Rectangle from '../rectangle';
import ImageHelper from '../imageHelper';
import { GameOptions } from '../game';

export default abstract class Enemy {
  life: number;
  position: Rectangle;
  positionOnScreen: Rectangle;
  tileSheet: HTMLImageElement;
  coloredTileSheet: HTMLCanvasElement;
  lastShot = 0;
  options: GameOptions;

  constructor(left: number, top: number, width: number, height: number, life: number, options: GameOptions) {
    this.life = life;
    this.position = new Rectangle(left, top, width, height);
    this.positionOnScreen = new Rectangle(0, 0, width, height);
    this.options = options;
  }

  // TODO: Default isHitable hinzufügen
  abstract isHitable(): boolean;

  /**
   * Hit an enemy and return if it was killed
   * @param dmg The damage done to the enemy
   * @returns true if the enemy was killed
   */
  hit(dmg: number): boolean {
    this.life -= dmg;
    // TODO: Lastshot in die Update Methode des Enemys hauen und mit Zeit runterzählen
    this.lastShot = 3;

    return this.life <= 0;
  }

  loadContent(tileSheet: HTMLImageElement, ) {
    this.tileSheet = tileSheet;
    this.coloredTileSheet = ImageHelper.tintImage(tileSheet, "#FF0000");
  }
  abstract draw(): void;
  abstract update(elapsedMillis: number): void;
}
