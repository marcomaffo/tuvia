import Enemy from './enemy';
import Player from '../player';
import { GameOptions } from '../game';

export default class FlyingEnemy extends Enemy {
  state = 0;
  lookingDirection = 0;
  timeSinceStateChange = 0;
  player: Player;
  positionX: number;
  positionY: number;

  constructor(left: number, top: number, player: Player, options: GameOptions) {
    super(left, top, 35, 51, 9, options);
    this.player = player;
    this.positionX = left;
    this.positionY = top;
  }


  update(elapsedMillis: number) {
    // animate the enemy
    this.timeSinceStateChange += elapsedMillis;
    if (this.timeSinceStateChange > 150) {
      this.timeSinceStateChange -= 150;
      this.state = (this.state + 1) % 4;
    }

    // calculate the distance to determine when to move towards the player
    const distY = (this.position.y + (this.position.height / 2)) - (this.player.posYOnMap + (this.player.playerHeight / 2));
    const distX = (this.position.x + (this.position.width / 2) - (this.player.posXOnMap + (this.player.playerWidth / 2)));

    const distanceToPlayer = Math.sqrt((distY * distY) + (distX * distX));

    if (distanceToPlayer < 200) {
      const pitchAngle = Math.atan((this.positionY - this.player.posYOnMap) / (this.positionX - this.player.posXOnMap));
      let b = Math.sin(pitchAngle) * 1;
      let a = Math.cos(pitchAngle) * 1;

      // if the angle is greater than 180 degrees
      if (this.player.posXOnMap < this.positionX) {
        b *= -1;
        a *= -1;
        this.lookingDirection = 0;
      } else {
        this.lookingDirection = 1;
      }

      this.positionX += a;
      this.positionY += b;

      this.position.x = Math.round(this.positionX);
      this.position.y = Math.round(this.positionY);
    }
  }

  draw() {
    let toDrawImage: HTMLCanvasElement | HTMLImageElement = this.tileSheet;
    if (this.lastShot > 0) {
        toDrawImage = this.coloredTileSheet;
        this.lastShot--;
    }
    this.options.canvasContext.drawImage(toDrawImage, this.state * 35, this.lookingDirection * 51, 35, 51, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  isHitable() {
    return true;
  }
}
