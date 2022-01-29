import Rectangle from "./rectangle";

export enum PowerupType {
  ammoSmall = 0,
  ammoBig = 1,
  health = 2,
}

export default class PowerUp {
  position: Rectangle;
  positionOnScreen = new Rectangle(0, 0, 10, 10);
  yPos: number;
  type: PowerupType;
  statePosition = 0;
  giveAmmo = 0;
  giveHealth = 0;
  moveDirection: 'up' | 'down' = 'down';
  texture: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(type: PowerupType, x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.position = new Rectangle(x, y, 10, 10);
    this.yPos = y;
    this.type = type;
    switch (this.type) {
      case PowerupType.ammoSmall:
        this.giveAmmo = 20;
        break;
      case PowerupType.ammoBig:
        this.giveAmmo = 50;
        break;
      case PowerupType.health:
        this.giveHealth = 25;
        break;
    }
  }

  loadContent(texture: HTMLImageElement) {
    this.texture = texture;
  }

  update() {
    if (this.moveDirection === 'up') {
      this.statePosition += 0.1;
      if (this.statePosition >= 3) {
        this.moveDirection = 'down';
      }
    } else {
      this.statePosition -= 0.1;
      if (this.statePosition <= 0.0) {
        this.moveDirection = 'up';
      }
    }
    this.position.y = this.yPos + this.statePosition;
  }

  draw() {
    this.ctx.drawImage(this.texture ,this.positionOnScreen.x, this.positionOnScreen.y, this.positionOnScreen.width, this.positionOnScreen.height);
  }

  giveStats() {
    return {ammo: this.giveAmmo, health: this.giveHealth};
  }
}
