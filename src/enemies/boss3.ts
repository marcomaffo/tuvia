import BossLevel3 from '../levels/mainLevels/bossLevel3';
import { GameOptions } from '../game';
import ImageHelper from '../imageHelper';
import Enemy from './enemy';
export default class Boss3 extends Enemy {
  bossTex: HTMLImageElement;
  coloredBossTex: HTMLCanvasElement;

  state = 0;
  timeSinceStateChange = 0;
  lookingDirection = 1;

  targetPosition:number[];
  level: BossLevel3;

  static maxLife = 150;
  
  posX: number;
  posY: number;
  b: number;
  a: number;

  waitTime = 2000;

  constructor(posX: number, posY: number, level: BossLevel3, options: GameOptions) {
    super(posX, posY, 150, 100, Boss3.maxLife, options);
    this.level = level;
  
    this.posX = posX;
    this.posY = posY;
    this.setNewRandomPosition();
    this.calculateAngle();
  }

  loadContent(bossTex: HTMLImageElement) {
    this.bossTex = bossTex;
    this.coloredBossTex = ImageHelper.tintImage(bossTex, "#FF0000");
  }

  update(elapsedMillis: number) {
    if (this.waitTime > 0) {
        this.waitTime -= elapsedMillis;
    } else {
      this.posX += this.a;
      this.posY += this.b;

      if (this.lookingDirection === 0) {
        if (this.posX < this.targetPosition[0]) {
          this.posX = this.targetPosition[0];
          this.posY =this.targetPosition[1];

          this.setNewRandomPosition();
          this.calculateAngle();

          this.waitTime = 1000;

          this.level.fire();
        }
      } else {
        if (this.posX > this.targetPosition[0]) {
          this.posX = this.targetPosition[0];
          this.posY = this.targetPosition[1];

          this.setNewRandomPosition();
          this.calculateAngle();

          this.waitTime = 1000;

          this.level.fire();
        }
      }

      this.position.x = Math.round(this.posX);
      this.position.y = Math.round(this.posY);
    }

    this.timeSinceStateChange += elapsedMillis;
    if (this.timeSinceStateChange > 100) {
      this.timeSinceStateChange -= 100;
      this.state = (this.state + 1) % 4;
    }
  }

  draw() {
    let toDrawImage: HTMLImageElement | HTMLCanvasElement = this.bossTex;
    if (this.lastShot > 0) {
      toDrawImage = this.coloredBossTex;
      this.lastShot--;
    }
    this.options.canvasContext.drawImage(toDrawImage, this.state * 150, this.lookingDirection * 100, 150, 100, this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);

    this.options.canvasContext.fillStyle = "#FFFFFF";
    this.options.canvasContext.fillRect(100, 10, 600, 20);
    this.options.canvasContext.fillStyle = "#00FF00";
    this.options.canvasContext.fillRect(105, 11, Math.round(590 * (this.life / Boss3.maxLife)), 18);
  }

  isHitable() {
    return true;
  }

  calculateAngle() {
    // Berechnung der laengen der Bewegungsseiten
    const pitchAngle = Math.atan((this.posY - this.targetPosition[1]) / (this.posX - this.targetPosition[0]));
    this.b = Math.sin(pitchAngle) * 2;
    this.a = Math.cos(pitchAngle) * 2;

    // Wenn der Winkel ueber 180 wird
    if (this.targetPosition[0] < this.posX) {
      this.b *= -1;
      this.a *= -1;
    }
  }

  setNewRandomPosition() {
    if (this.lookingDirection === 0) {
      const right = 600;
      const top = Math.floor(Math.random() * 180) + 60;
      this.targetPosition = [ right, top ];
      this.lookingDirection = 1;
    } else {
      const left = 50;
      const top = Math.floor(Math.random() * 180) + 60;
      this.targetPosition = [ left, top ];
      this.lookingDirection = 0;
    }
  }
}
