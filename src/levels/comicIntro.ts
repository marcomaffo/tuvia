import Game from "../game";
import { KeyboardState } from "../keyboard";
import PlayerStats from "../playerStats";
import Rectangle from "../rectangle";
import AllLevelSuperClass from "./allLevelSuperClass";

export default class ComicIntro extends AllLevelSuperClass {
  noKeyboard = false;
  comic: HTMLImageElement;
  space: HTMLImageElement;
  spaceRect: Rectangle;
  moving = false;
  movingTo = 0;
  destinationRect: Rectangle;
  sourceRect: Rectangle;
  positionX = 0;
  positionY = 0;
  moveSpeed = 5;

  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
  }

  loadContent(comic: HTMLImageElement, space: HTMLImageElement) {
    this.comic = comic;
    this.space = space;
    this.destinationRect = new Rectangle(0, 0, this.game.options.screenWidth, this.game.options.screenHeight);
    this.sourceRect = new Rectangle(0, 0, this.game.options.screenWidth, this.game.options.screenHeight);
    this.spaceRect = new Rectangle((this.game.options.screenWidth / 2) - (space.width / 2), 400, space.width, space.height);
    this.playerStats.isDrawn = false;
  }

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    if (!this.noKeyboard) {
      if (keyboardState.space) {
        if (this.movingTo === 5) {
          this.nextLevel();
        }
        this.moving = true;
        this.noKeyboard = true;
        this.movingTo++;
      }
    }
    if (this.moving) {
      let yEndReached = false;
      let xEndReached = false;

      const moveToY = Math.floor(this.movingTo / 2) * this.game.options.screenHeight;

      if (this.positionY !== moveToY) {
        this.positionY += this.moveSpeed;
        if (this.positionY > moveToY) {
          this.positionY = moveToY;
        }
      } else {
        yEndReached = true;
      }

      const moveToX = ((this.movingTo % 2) * (this.comic.width - this.game.options.screenWidth));
      const direction = this.positionX > moveToX ? -1 : 1;

      if (this.positionX !== moveToX) {
        this.positionX += this.moveSpeed * direction;
        if (direction === -1) {
          if (this.positionX < moveToX) {
            this.positionX = moveToX;
            xEndReached = true;
          }
        } else {
          if (this.positionX > moveToX) {
            this.positionX = moveToX;
            xEndReached = true;
          }
        }
      } else {
        xEndReached = true;
      }

      if (yEndReached && xEndReached) {
        this.noKeyboard = false;
        this.moving = false;
      }
    }
    this.sourceRect.x = Math.round(this.positionX);
    this.sourceRect.y = Math.round(this.positionY);
  }

  draw() {
    this.game.options.canvasContext.drawImage(this.comic, this.sourceRect.x, this.sourceRect.y, this.sourceRect.width, this.sourceRect.height, this.destinationRect.x, this.destinationRect.y, this.destinationRect.width, this.destinationRect.height);
    if (!this.noKeyboard) {
      this.game.options.canvasContext.drawImage(this.space, this.spaceRect.x, this.spaceRect.y, this.spaceRect.width, this.spaceRect.height);
    }
  }
}
