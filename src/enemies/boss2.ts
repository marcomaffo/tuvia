import BossLevel2 from "../levels/mainLevels/bossLevel2";
import { GameOptions } from "../game";
import ImageHelper from "../imageHelper";
import Enemy from "./enemy";

export default class Boss2 extends Enemy {
  level: BossLevel2;
  bossBody: HTMLImageElement;
  bossLegs: HTMLImageElement;
  coloredBody: HTMLCanvasElement;
  coloredLegs: HTMLCanvasElement;

  rotation = 0;
  timeToStart = 2000;
  timeSinceLastPowerup = 0;

  speed = 0.0;
  direction = -1.0;

  static maxLife = 150;

  fallingSpeed = 0.0;

  positionOnWalls = 5;
  posX: number;
  posY: number;
  circumference: number;

  constructor(left: number, top: number, bossLevel: BossLevel2, options: GameOptions) {
    super(left, top, 78, 78, Boss2.maxLife, options);
    this.level = bossLevel;
    this.level.playerCanMove = false;
    
    this.posX = left;
    this.posY = top;
    this.circumference = 2 * Math.PI * (this.position.width / 2);
  }

  loadBossContent(bossBody, bossLegs) {
    this.bossBody = bossBody;
    this.bossLegs = bossLegs;
    this.coloredBody = ImageHelper.tintImage(bossBody, "#FF0000");
    this.coloredLegs = ImageHelper.tintImage(bossLegs, "#FF0000");
  }

  update(elapsedMillis: number) {
    this.timeSinceLastPowerup += elapsedMillis;
    if (this.timeSinceLastPowerup > 8000) {
      this.timeSinceLastPowerup -= 8000;
      if (!this.level.isPowerup()) {
        this.level.createPowerup();
        this.timeSinceLastPowerup = 0;
      }
    }
    switch (this.positionOnWalls) {
      case 0:
          if (this.timeToStart < 0) {
            if (this.speed < 2.0 && this.speed > -2.0) {
              this.speed += 0.05 * this.direction;
            }
            this.posX += this.speed;
            if (this.speed > 0) {
              if (this.posX + this.position.width > 720) {
                this.posX = 720 - this.position.width;
                this.positionOnWalls = 1;
              }
            } else {
              if (this.posX < 80) {
                this.posX = 80;
                this.positionOnWalls = 2;
              }
            }
          } else {
            this.timeToStart -= elapsedMillis;
          }
          break;
        case 1:
        case 2: this.posY -= Math.abs(this.speed);
            if (this.posY < 80) {
              this.posY = 80;
              this.positionOnWalls = 3;
            }
          break;
        case 3: this.posX -= this.speed;
            if (this.speed > 0) {
              if (this.level.getPlayerPositionX() >= this.posX) {
                this.positionOnWalls = 4;
              }
            } else {
              if (this.level.getPlayerPositionX() <= this.posX + 50) {
                this.positionOnWalls = 4;
              }
            }
            break;
        case 4:
            this.fallingSpeed += 0.3;
            this.posY += this.fallingSpeed;
            if (this.posY > 320) {
              this.speed = 0.0;
              this.fallingSpeed = 0.0;
              this.posY = 320;
              this.positionOnWalls = 0;
              this.direction = (this.level.getPlayerPositionX() <this.posX) ? -1 : 1;
              this.timeToStart = 1000;
            }
          break;
        case 5: this.timeToStart -= elapsedMillis;
            if (this.timeToStart < 0) {
              this.level.playerCanMove = true;
              this.positionOnWalls = 0;
            }
          break;
    }


    this.position.x = Math.round(this.posX);
    this.position.y = Math.round(this.posY);

    // rotation of the wheel
    if (this.positionOnWalls !== 4 && this.speed !== 0) {
      this.rotation += (2 * Math.PI) * (this.speed / this.circumference);
      if (this.speed > 0)  {
        if (this.rotation > Math.PI * 2) {
          this.rotation = this.rotation - Math.PI * 2;
        }
      } else {
        if (this.rotation < 0) {
          this.rotation = (2 * Math.PI) - this.rotation;
        }
      }
    }
  }

  draw() {
    let toDrawImageBody: HTMLImageElement | HTMLCanvasElement = this.bossBody;
    let toDrawImageLegs: HTMLImageElement | HTMLCanvasElement = this.bossLegs;
    if (this.lastShot > 0) {
        toDrawImageBody = this.coloredBody;
        toDrawImageLegs = this.coloredLegs;
        this.lastShot--;
    }

    this.options.canvasContext.save();
    this.options.canvasContext.translate(this.position.width / 2 + this.position.x, this.position.height / 2 + this.position.y);
    this.options.canvasContext.rotate(this.rotation);
    this.options.canvasContext.translate(-(this.position.width / 2 + this.position.x), -(this.position.height / 2 + this.position.y));

    this.options.canvasContext.drawImage(toDrawImageLegs, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
    this.options.canvasContext.restore();

    this.options.canvasContext.drawImage(toDrawImageBody, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);

    this.options.canvasContext.fillStyle = "#FFFFFF";
    this.options.canvasContext.fillRect(100, 10, 600, 20);
    this.options.canvasContext.fillStyle = "#00FF00";
    this.options.canvasContext.fillRect(105, 11, Math.round(590 * (this.life / Boss2.maxLife)), 18);
  }

  isHitable() {
    return true;
  }
}
