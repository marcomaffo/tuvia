import Enemy from './enemy';
import Player from '../player';
import { GameOptions } from '../game';

export default class FloorEnemy extends Enemy {
  player: Player;
  direction = 0;
  timeSinceStateChange = 0;
  state = 0;

  constructor(left: number, top: number, player: Player, options: GameOptions) {
    super(left, top, 36, 40, 6, options);
    this.player = player;
    if (player.posXOnMap < left) {
        this.direction = 1;
    }
  }

  update(elapsedMillis: number) {
    // determine the looking direction relative to the player
    if (this.player.posXOnMap < this.position.x) {
      this.direction = 1;
    } else {
      this.direction = 0;
    }
    // calculating the player distance to determine when to show the enemy
    const distY = this.position.y - (this.player.posYOnMap + 20.0);
    const distX = this.position.x + (this.position.width / 2) - (this.player.posXOnMap + (this.player.playerWidth / 2));

    const dist = Math.sqrt((distY * distY) + (distX * distX));
    if (dist < 120) {
        if (this.state < 4) {
            this.timeSinceStateChange += elapsedMillis;
            if (this.timeSinceStateChange > 100) {
                this.state++;
                this.timeSinceStateChange -= 100;
            }
        }
    } else {
        if (this.state > 0) {
            this.timeSinceStateChange += elapsedMillis;
            if (this.timeSinceStateChange > 100) {
                this.state--;
                this.timeSinceStateChange -= 100;
            }
        }
    }
  }

  draw() {
    let toDrawImage: HTMLImageElement | HTMLCanvasElement = this.tileSheet;
    if (this.lastShot > 0) {
        toDrawImage = this.coloredTileSheet;
        this.lastShot--;
    }
    this.options.canvasContext.drawImage(toDrawImage, this.state * 36, this.direction * 41, 36, 40, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return this.state > 2;
  }
}
