import { GameOptions } from "./game";
import Rectangle from "./rectangle";

export default class Player {
  posXOnMap: number;
  posYOnMap: number;
  
  posXOnScreen = 0;
  posYOnScreen = 0;

  playerWidth = 32;
  playerHeight = 54;

  horizontalSpeed = 0;
  verticalSpeed = 0;

  walkingState = 0;

  jumped = false;
  secondJump = false;
  jumpRelease = false;
  onFloor = false;
  timeRunning = 0;

  runningDirection = 0;

  playerSheet: HTMLImageElement;

  options: GameOptions;

  friction: number;

  mapWidth: number;
  mapHeight: number;

  constructor(posXOnMap: number, posYOnMap: number, mapWidth: number, mapHeight: number, friction: number, options: GameOptions) {
    this.posXOnMap = posXOnMap;
    this.posYOnMap = posYOnMap;
    this.friction = friction;
    this.options = options;
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  loadContent(playerSheet: HTMLImageElement) {
    this.playerSheet = playerSheet;
  }

  update() {
    this.gravity();
  }

  draw() {
    this.options.canvasContext.drawImage(this.playerSheet, this.playerWidth * this.walkingState, this.runningDirection, this.playerWidth, this.playerHeight, this.posXOnScreen, this.posYOnScreen, this.playerWidth, this.playerHeight);
  }

  gravity() {
    if (this.verticalSpeed < 10.0) {
      this.verticalSpeed = this.verticalSpeed + 0.35;
    }
    this.posYOnMap += this.verticalSpeed;
  }

  calculateScreenPosition() {
    const positionsOnScreen: number[] = new Array(2);

    if (Math.round(this.posYOnMap) - Math.round(0.5 * this.options.screenHeight) < 0) {
      positionsOnScreen[1] = Math.round(this.posYOnMap);
    } else if (Math.round(this.posYOnMap) + Math.round(0.5 * this.options.screenHeight) > this.mapHeight) {
      positionsOnScreen[1] = this.options.screenHeight + (Math.round(this.posYOnMap) - this.mapHeight);
    } else {
      positionsOnScreen[1] = Math.round(0.5 * this.options.screenHeight);
    }

    if (Math.round(this.posXOnMap) - Math.round(0.5 * this.options.screenWidth) < 0) {
      positionsOnScreen[0] = Math.round(this.posXOnMap);
    } else if (Math.round(this.posXOnMap) + Math.round(0.5 * this.options.screenWidth) > this.mapWidth) {
      positionsOnScreen[0] = this.options.screenWidth + (Math.round(this.posXOnMap) - this.mapWidth);
    } else {
      positionsOnScreen[0] = Math.round(0.5 * this.options.screenWidth);
    }

    this.posXOnScreen = positionsOnScreen[0];
    this.posYOnScreen = positionsOnScreen[1];
  }

  jump() {
    if (!this.jumped && this.jumpRelease) {
      this.verticalSpeed = -8.0;
      this.jumped = true;
      this.jumpRelease = false;
    } else {
      if (!this.secondJump && this.jumpRelease) {
        this.verticalSpeed = -8.0;
        this.secondJump = true;
        this.jumpRelease = false;
      }
    }
  }

  move(direction: number, elapsedMillis: number) {
    if (direction != 0) {
      // Hier wird bestimmt, welche Richtung der Spieler laueft um das sourceRectangle zu besimmen
      if (direction > 0) {
        this.runningDirection = 0;
      } else {
        this.runningDirection = this.playerHeight;
      }

      this.horizontalSpeed += direction * 1.0 * this.friction;
      if (this.horizontalSpeed > 3) {
        this.horizontalSpeed = 3;
      } else if (this.horizontalSpeed < -3 ){
        this.horizontalSpeed = -3;
      }

      if (this.onFloor) {
        this.timeRunning += elapsedMillis;
        if (this.timeRunning > 100) {
          this.walkingState = (this.walkingState + 1) % 4;
          this.timeRunning -= 100;
        }
      } else {
        this.walkingState = 0;
        this.timeRunning = 0;
      }
    } else {
      if (this.horizontalSpeed > 0 && this.onFloor) {
        this.horizontalSpeed -= this.friction;
      } else if (this.horizontalSpeed < 0 && this.onFloor) {
        this.horizontalSpeed += this.friction;
      }

      if (this.horizontalSpeed < 0.2 && this.horizontalSpeed > -0.2) {
        this.horizontalSpeed = 0.0;
      }
      this.walkingState = 0;
      this.timeRunning = 0;
    }
    this.posXOnMap += this.horizontalSpeed;
  }

  getPlayerRect() {
    return new Rectangle(Math.round(this.posXOnMap), Math.round(this.posYOnMap), this.playerWidth, this.playerHeight);
  }
}
