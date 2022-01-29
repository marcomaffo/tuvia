import Game, { PlayType } from "../../game";
import { KeyboardState } from "../../keyboard";
import AllLevelSuperClass from "../allLevelSuperClass";
import CancerCell from "./cancerCell";
import Platelet from "./platelet";
import RedBloodCell from "./redBloodCell";
import SurfEnemy from "./surfEnemy";

const surfTimeToFinish = 45000;

export default class SurfLevel extends AllLevelSuperClass {
  posX: number;
  posY: number;
  playerRadius: number;
  playerSprite: HTMLImageElement;
  redBloodcell: HTMLImageElement;
  background: HTMLImageElement;
  bloodPatch: HTMLImageElement;
  cancerCell: HTMLImageElement;

  levelY = 0;
  leftBorder = 80;
  rightBorder = 720;

  totalTime = 0;
  timeForEnemyEmittment = 0;
  cellsEmitted = 0;
  mistakes = 0;
  
  surfEnemies: SurfEnemy[] = new Array();

  constructor(playerStats, game) {
    super(playerStats, game);
    playerStats.fill();
  }

  loadContent(playerSprite: HTMLImageElement, redBloodcell: HTMLImageElement, background: HTMLImageElement, bloodPatch: HTMLImageElement, cancerCell: HTMLImageElement) {
    this.playerSprite = playerSprite;
    this.redBloodcell = redBloodcell;
    this.background = background;
    this.bloodPatch = bloodPatch;
    this.cancerCell = cancerCell;

    this.posX = (this.game.options.screenWidth / 2);
    this.posY = (this.game.options.screenHeight / 2);
    this.playerRadius = playerSprite.width / 2;

    if (this.game.playType === PlayType.KnightSetting) {
      this.showHelpText("Weiche den Steinen und Baumstämmen aus, um zum Sumpf zu kommen!", 1);
    } else {
      this.showHelpText("Wir schwimmen auf einem weissen Blutkörperchen durch die Blutbahn!", 1);
    }
  }

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.totalTime += elapsedMillis;
    if (this.totalTime > surfTimeToFinish) {
      if (this.game.playType === PlayType.KnightSetting) {
        this.showHelpText("Super du hast es geschafft, wir sind im Sumpf angekommen!", 4);
      } else {
        this.showHelpText("Super du hast es geschafft, wir sind im Lymphsystem angekommen!", 4);
      }
    }

    this.timeForEnemyEmittment += elapsedMillis;
    if (this.timeForEnemyEmittment > 1500) {
      this.cellsEmitted++;
      this.timeForEnemyEmittment -= 1500;
      let type: number;

      if (this.cellsEmitted > 10) {
        type = Math.floor(Math.random() * 3);
      } else {
        type = Math.floor(Math.random() * 2);
      }

      const xPos = Math.floor(Math.random() * 530);
      const speed = Math.floor(Math.random() * 2);
      if (type === 0) {
        const redcell = new RedBloodCell(speed + 3, xPos + 80, this.game.options);
        redcell.loadContent(this.redBloodcell);
        this.surfEnemies.push(redcell);
      } else if (type === 1) {
        const cancerCell = new CancerCell(speed + 3, xPos + 80, this, this.game.options);
        cancerCell.loadContent(this.cancerCell);
        this.surfEnemies.push(cancerCell);
      } else {
        const platelet = new Platelet(speed + 3, xPos + 80, this, -1 + Math.floor(Math.random() * 2) * 2, this.game.options);
        platelet.loadContent(this.bloodPatch);
        this.surfEnemies.push(platelet);
      }
    }

    this.levelY = (this.levelY + 5) % 200;

    if (keyboardState.left) {
      this.posX -= 4;
      if (this.posX - this.playerRadius < this.leftBorder) {
        this.posX = this.leftBorder + this.playerRadius;
      }
    }
    if (keyboardState.right) {
      this.posX += 4;
      if (this.posX + this.playerRadius > this.rightBorder) {
        this.posX = this.rightBorder - this.playerRadius;
      }
    }
    if (keyboardState.up) {
      this.posY -= 2;
      if (this.posY - this.playerRadius < 0) {
        this.posY = this.playerRadius;
      }
    }
    if (keyboardState.down) {
      this.posY += 5;
      if (this.posY + this.playerRadius > 480) {
        this.posY = 480 - this.playerRadius;
      }
    }

    const toDestroyEnemies: SurfEnemy[] = new Array();
    for (const surfEnemy of this.surfEnemies) {
      surfEnemy.update(elapsedMillis);
      const distanceX = surfEnemy.posX - this.posX;
      const distanceY = surfEnemy.posY - this.posY;
      const sqLength = distanceX * distanceX + distanceY * distanceY;
      const distance = Math.sqrt(sqLength);
      const minDistanceToCollide = surfEnemy.radius + this.playerRadius;

      if (distance < minDistanceToCollide) {
        toDestroyEnemies.push(surfEnemy);
        if (!(surfEnemy instanceof CancerCell)) {
          this.mistakes++;
        }
      } else if (surfEnemy.posY - surfEnemy.radius > this.game.options.screenHeight) {
        toDestroyEnemies.push(surfEnemy);
        if (surfEnemy instanceof CancerCell) {
          this.mistakes++;
        }
      }
      if (this.mistakes > 10) {
        this.showHelpText("Du hast mehr als 10 Fehler gemacht, versuche es noch einmal! ", 99);
      }
    }

    this.surfEnemies = this.surfEnemies.filter(surfEnemy => !toDestroyEnemies.some(toDestroyEnemy => toDestroyEnemy === surfEnemy));
  }

  draw() {
    for (let i = -1; i < 3; i++) {
      this.game.options.canvasContext.drawImage(this.background, 0, i * 200 + this.levelY, 800, 200);
    }

    for (const surfEnemy of this.surfEnemies) {
      surfEnemy.draw();
    }

    this.game.options.canvasContext.drawImage(this.playerSprite, this.posX - this.playerRadius, this.posY - this.playerRadius, this.playerRadius * 2, this.playerRadius * 2);

    const mistakesText = "Fehler: " + this.mistakes;
    this.game.options.canvasContext.font = "30px Arial";
    this.game.options.canvasContext.fillStyle = "#FFFFFF";
    this.game.options.canvasContext.fillText(mistakesText , (this.game.options.screenWidth - this.game.options.canvasContext.measureText(mistakesText).width) / 2, 30);
  }

  getNormalizedRelativePositionToPlayer(cellPosX: number) {
    if (cellPosX < this.posX) {
      return -1;
    } else {
      return 1;
    }
  }

  helpTextIsReady(eventNumber: number) {
    if (this.game.playType === PlayType.KnightSetting) {
      switch (eventNumber) {
        case 1: this.showHelpText("Versuche auch alle Trolle zu versenken die dir entgegen kommen! ", 2);
          break;
        case 2: this.showHelpText("Aber erwische und verpasse nicht mehr als 10 Hindernisse und Trolle. ", 3);
          break;
        case 4:
          this.playerStats.isDrawn = true;
          this.nextLevel();
          break;
        case 99: this.game.restartLevel();
          break;
      }
  } else {
      switch (eventNumber) {
        case 1: this.showHelpText("Versuche nicht die roten Blutkörpechen und Blutplättchen zu treffen.", 2);
          break;
        case 2: this.showHelpText("Dies würde dich schwächen, aber lasse möglichst alle Krebszellen von dem", 3);
          break;
        case 3: this.showHelpText("weißen Blutkörperchen fressen. Lasse aber nicht zu viele Krebszellen durch", 5);
          break;
        case 5: this.showHelpText("und fresse nicht zu viele Blutzellen, insgesamt maximal 10 Stück!", 6);
          break;
        case 4:
          this.playerStats.isDrawn = true;
          this.nextLevel();
          break;
        case 99: this.game.restartLevel();
          break;
      }
    }
  }
}
