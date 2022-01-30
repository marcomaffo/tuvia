import Enemy from './enemy';
import Rectangle from '../rectangle';
import ImageHelper from '../imageHelper';
import { GameOptions } from '../game';
import BossLevel1 from '../levels/mainLevels/bossLevel1';

export default class Boss1 extends Enemy {
  level: BossLevel1;
  
  powerUpSet = false;
  starState = -1;
  bossDirection = 1;
  
  currentState = 0;
  rotationDegrees = 0;
  currentAction = -1;

  timeSinceLastAction = 0;
  timeSinceLastStateChange = 0;
  timeSinceLastStarChange = 0;
  
  timeSinceLastThrow = 0;

  static maxLife = 120;

  bossY = 0;
  bossFallingSpeed = 0;

  intro = false;

  constructor(left: number, top: number, bossLevel: BossLevel1, options: GameOptions) {
    super(left, top, 196, 160, Boss1.maxLife, options);
    this.level = bossLevel;
    this.level.playerCanMove = false;
  }

  bossNormalTexture: HTMLImageElement;
  coloredBossNormalTexture: HTMLCanvasElement;
  stars: HTMLImageElement;
  starRect: Rectangle;

  loadBossContent(bossNormalTexture: HTMLImageElement, stars: HTMLImageElement) {
    this.bossNormalTexture = bossNormalTexture;
    this.coloredBossNormalTexture = ImageHelper.tintImage(bossNormalTexture, "#FF0000");
    this.stars = stars;
    this.starRect = new Rectangle(575, 270, 100, 50);
  }

  update(elapsedMillis: number) {
    if (!this.intro) {
      this.timeSinceLastAction += elapsedMillis;
      this.timeSinceLastStateChange += elapsedMillis;
      switch (this.currentAction) {
        case -1:
          if (this.timeSinceLastAction > 1000) {
            this.timeSinceLastAction = 0;
            this.timeSinceLastStateChange = 0;
            this.currentAction++;
          }
          break;
        case 0:
          if (this.timeSinceLastStateChange > 150) {
            this.currentState = (this.currentState + 1) % 4;
            this.timeSinceLastStateChange -= 150;
          }
          if (this.timeSinceLastAction > 1500) {
            this.timeSinceLastAction = 0;
            this.currentState = 0;
            this.currentAction++;
          }
          break;
        case 1:
          this.rotationDegrees += 180 / 1000 * elapsedMillis;
          if (this.rotationDegrees >= 180) {
            this.rotationDegrees = 180;
            this.currentState = 0;
            this.currentAction++;
          }
          break;
        case 2:
          if (this.timeSinceLastStateChange > 150) {
            this.currentState = (this.currentState + 1) % 4;
            this.timeSinceLastStateChange -= 150;
          }
          this.position.y -= 2;
          if (this.position.y < 40) {
            this.position.y = 40;
            this.currentAction++;
            this.currentState = 0;
          }
          break;
        case 3:
          this.rotationDegrees -= 180 / 1000 * elapsedMillis;
          if (this.rotationDegrees <= 0) {
            this.rotationDegrees = 0;
            this.currentAction++;
            this.intro = true;
            this.level.playerCanMove = true;
            this.currentState = 0;
            this.timeSinceLastAction = 0;
            this.timeSinceLastStateChange = 0;
          }
          break;
        }
    } else {
      this.timeSinceLastAction += elapsedMillis;
      this.timeSinceLastStateChange += elapsedMillis;
      switch (this.currentAction) {
        case 0:
          this.timeSinceLastStarChange += elapsedMillis;
          if (this.timeSinceLastStarChange > 50) {
            this.timeSinceLastStarChange -= 50;
            this.starState = (this.starState + 1) % 5;
          }
          if (this.timeSinceLastStateChange > 150) {
            this.currentState = (this.currentState + 1) % 4;
            this.timeSinceLastStateChange -= 150;
          }
          if (this.timeSinceLastAction > 3000) {
            this.timeSinceLastAction = 0;
            this.timeSinceLastStateChange = 0;
            this.currentState = 0;
            this.bossDirection = 1;
            this.currentAction++;
            this.starState = -1;
          }
          break;
        case 1:
          this.rotationDegrees += this.bossDirection * 180 / 1000 * elapsedMillis;
          if (this.rotationDegrees < 0 || this.rotationDegrees > 180) {
            this.currentState = 0;
            this.currentAction += this.bossDirection;
          }
          break;
        case 2:
          if (this.bossDirection === -1) {
            this.bossFallingSpeed += 0.2;
            this.bossY += this.bossFallingSpeed;
            this.position.y = this.bossY;
            if (this.position.y > 280) {
              this.position.y = 280;
              this.currentAction = 0;
              this.rotationDegrees = 0;
              this.timeSinceLastStateChange = 0;
              this.timeSinceLastAction = 0;
              this.bossFallingSpeed = 0;
            }
          } else {
            if (this.timeSinceLastStateChange > 150) {
              this.currentState = (this.currentState + 1) % 4;
              this.timeSinceLastStateChange -= 150;
            }

            this.position.y -= 2;
            if (this.position.y < 40) {
              this.timeSinceLastStateChange = 0;
              this.timeSinceLastAction = 0;
              this.position.y = 40;
              this.currentAction += 1;
              this.rotationDegrees = 180;
            }
          }
          break;
        case 3:
          if (this.bossDirection === -1) {
            this.currentAction--;
            this.timeSinceLastAction = 0;
            this.timeSinceLastStateChange = 0;
          } else {
            this.rotationDegrees -= 180 / 1000 * elapsedMillis;
            if (this.rotationDegrees <= 0) {
              this.rotationDegrees = 0;
              this.currentState = 0;
              this.currentAction++;
            }
          }
          break;
        case 4:
          if (!this.powerUpSet) {
            this.level.createPowerup();
            this.powerUpSet = true;
          }
          this.timeSinceLastThrow += elapsedMillis;
          if (this.timeSinceLastThrow > 1200) {
            this.timeSinceLastThrow -= 1200;
            this.level.throwNewCell();
          }

          if (this.timeSinceLastStateChange > 150) {
            this.currentState = (this.currentState + 1) % 4;
            this.timeSinceLastStateChange -= 150;
          }

          if (this.timeSinceLastAction > 5000) {
            this.powerUpSet = false;
            this.timeSinceLastAction = 0;
            this.timeSinceLastStateChange = 0;
            this.currentState = 0;
            this.bossDirection = -1;
            this.currentAction--;
            this.timeSinceLastThrow = 0;
            this.bossY = this.position.y;
            this.level.removePowerups();
          }
          break;
      }
    }
  }

  draw() {
    let bossTex: HTMLImageElement | HTMLCanvasElement = this.bossNormalTexture;
    if (this.lastShot > 0) {
      bossTex = this.coloredBossNormalTexture;
      this.lastShot--;
    }
    if (this.currentAction === 1 || this.currentAction === 3) {
      const relativeRotation = Math.abs(this.rotationDegrees - 90) * 1 / 90;
      if (this.rotationDegrees > 90) {
        this.options.canvasContext.drawImage(
          this.bossNormalTexture,
          0,
          0,
          196,
          160,
          this.positionOnScreen.x + (1 - relativeRotation) * this.positionOnScreen.width / 2,
          this.positionOnScreen.y,
          relativeRotation * this.positionOnScreen.width,
          this.positionOnScreen.height
        );
      } else {
        this.options.canvasContext.drawImage(
          this.bossNormalTexture,
          0,
          160,
          196,
          160,
          this.positionOnScreen.x + (1 - relativeRotation) * this.positionOnScreen.width / 2,
          this.positionOnScreen.y,
          relativeRotation * this.positionOnScreen.width,
          this.positionOnScreen.height
        );
      }
    } else {
      if (this.currentAction === 2 && this.bossDirection === 1) {
        this.options.canvasContext.drawImage(bossTex, this.currentState * 196, 0, 196, 160, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
      } else {
        this.options.canvasContext.drawImage(bossTex, this.currentState * 196, 160, 196, 160, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
      }
    }
    if (this.starState >= 0) {
      this.options.canvasContext.drawImage(this.stars, this.starState * 100, 0, 100, 50, this.starRect.x, this.starRect.y, this.starRect.width, this.starRect.height);
    }

    this.options.canvasContext.fillStyle = "#ffffff";
    this.options.canvasContext.fillRect(100, 10, 600, 20);
    this.options.canvasContext.fillStyle = "#00FF00";
    this.options.canvasContext.fillRect(105, 11, 590 * (this.life / Boss1.maxLife), 18);
  }

  isHitable() {
    return this.currentAction === 0;
  }
}
