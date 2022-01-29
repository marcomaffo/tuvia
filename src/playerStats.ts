import { GameOptions } from "./game";
import PowerUp from "./powerUp";
import Rectangle from "./rectangle";

const invulnerabilityTimeAfterHit = 1500;

export default class PlayerStats {
  private options: GameOptions;
  private life = 100;
  private ammo = 100;
  private lowerBound: number;
  private maxHeight: number;
  private ammoRectBorder: Rectangle;
  private ammoRectCenter: Rectangle;
  private lifeRectBorder: Rectangle;
  private lifeRectCenter: Rectangle;
  playerHitLastTime = 2001;
  drawPlayer = true;
  isDrawn = true;

  constructor(options: GameOptions) {
    this.options = options;
    this.lowerBound = (options.screenHeight * 0.04 + 2) + (options.screenHeight / 5.0 - 4);
    this.maxHeight = this.lowerBound - (options.screenHeight * 0.04 + 2);

    this.ammoRectBorder = new Rectangle(options.screenWidth * 0.95, options.screenHeight * 0.04, options.screenWidth / 40.0, options.screenHeight / 5.0);
    this.ammoRectCenter = new Rectangle(options.screenWidth * 0.95 + 2, this.lowerBound - this.maxHeight, (options.screenWidth / 40 - 4), this.maxHeight);

    this.lifeRectBorder = new Rectangle(options.screenWidth * 0.90, options.screenHeight * 0.04, options.screenWidth / 40.0, options.screenHeight / 5.0);
    this.lifeRectCenter = new Rectangle(options.screenWidth * 0.90 + 2, this.lowerBound - this.maxHeight, (options.screenWidth / 40.0 - 4), this.maxHeight);
  }

  draw() {
    if (this.isDrawn) {
      const ctx = this.options.canvasContext;
      this.ammoRectCenter.height = Math.ceil(this.maxHeight * (this.ammo / 100.0));
      this.ammoRectCenter.y = this.lowerBound - this.ammoRectCenter.height;

      ctx.fillStyle = "#000000";
      ctx.fillRect(this.ammoRectBorder.x, this.ammoRectBorder.y, this.ammoRectBorder.width, this.ammoRectBorder.height);
      ctx.fillStyle = "#ffa500";
      ctx.fillRect(this.ammoRectCenter.x, this.ammoRectCenter.y, this.ammoRectCenter.width, this.ammoRectCenter.height);

      this.lifeRectCenter.height = Math.ceil(this.maxHeight * (this.life / 100.0));
      this.lifeRectCenter.y = this.lowerBound - this.lifeRectCenter.height;

      ctx.fillStyle = "#000000";
      ctx.fillRect(this.lifeRectBorder.x, this.lifeRectBorder.y, this.lifeRectBorder.width, this.lifeRectBorder.height);
      ctx.fillStyle = "#609000";
      ctx.fillRect(this.lifeRectCenter.x, this.lifeRectCenter.y, this.lifeRectCenter.width, this.lifeRectCenter.height);
    }
  }

  canShoot() {
    return this.ammo > 0;
  }

  shoot() {
    this.ammo--;
  }

  playerHit(damage: number) {
    if (this.playerHitLastTime > invulnerabilityTimeAfterHit) {
      this.life -= damage;
      this.playerHitLastTime = 0;
      if (this.life <= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  useItem(powerUp: PowerUp) {
    const {ammo, health} = powerUp.giveStats();
    this.ammo += ammo;
    if (this.ammo > 100) {
      this.ammo = 100;
    }
    this.life += health;
    if (this.life > 100) {
      this.life = 100;
    }
  }

  updateTime(elapsedMilliseconds: number) {
    // Update the blinking state only if the player got hit
    if (this.playerHitLastTime <= invulnerabilityTimeAfterHit) {
      this.playerHitLastTime += elapsedMilliseconds;

      // The player is invisible for 50ms and then visible for 150 while in the blinking state
      if ((Math.floor(this.playerHitLastTime) % 200) < 50) {
        this.drawPlayer = false;
      } else {
        this.drawPlayer = true;
      }
    } else {
      this.drawPlayer = true;
    }
  }

  fill() {
    this.ammo = 100;
    this.life = 100;
  }
}