import AllLevelSuperClass from './allLevelSuperClass';
import { KeyboardState } from '../keyboard';
import Game, { PlayType } from 'src/game';
import PlayerStats from 'src/playerStats';

export default class SlidingPuzzle extends AllLevelSuperClass {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
  }
  map = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
  ];
  image: HTMLImageElement;

  moving = 0;
  playerAction = false;

  movingOffsetX = 0;
  movingOffsetY = 0;
  movingDirection = 0;

  randomMovements = 15;
  lastTurn = 0;

  timeSinceStart = 0;

  currentEvent = 0;

  loadContent(image: HTMLImageElement) {
    this.image = image;
    this.playerStats.isDrawn = false;
  }

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.timeSinceStart += elapsedMillis;
    if (this.timeSinceStart > 20000 && this.timeSinceStart < 21000) {
      this.currentEvent = 7;
      this.timeSinceStart = 21000;
    }
    if (this.timeSinceStart > 40000 && this.timeSinceStart < 41000) {
      this.currentEvent = 8;
      this.timeSinceStart = 41000;
    }

    this.checkForEvent();
    if (this.moving === 0) {
      if (this.playerAction) {
        if (keyboardState.up) {
          this.moveUp();
        } else if (keyboardState.down) {
          this.moveDown();
        } else if (keyboardState.left) {
          this.moveLeft();
        } else if (keyboardState.right) {
          this.moveRight();
        }
      } else {
        let run = true;
        while (run) {
          const move = Math.floor(Math.random() * 4);

          switch (move) {
            case 0:
              if (this.lastTurn !== 1 && this.moveUp()) {
                run = false;
                this.lastTurn = 0;
              }
              break;
            case 1:
              if (this.lastTurn !== 0 && this.moveDown()) {
                run = false;
                this.lastTurn = 1;
              }
              break;
            case 2:
              if (this.lastTurn !== 3 && this.moveLeft()) {
                run = false;
                this.lastTurn = 2;
              }
              break;
            case 3:
              if (this.lastTurn !== 2 && this.moveRight()) {
                run = false;
                this.lastTurn = 3;
              }
              break;
          }
        }
        this.randomMovements--;
        if (this.randomMovements == 0) {
          this.playerAction = true;
          this.currentEvent = 1;
        }
      }
    } else {
      if (this.movingOffsetX != 0) {
        this.movingOffsetX += this.movingDirection * 6;
        if (this.movingOffsetX == 0) {
          this.moving = 0;
          this.checkForFinish();
        }
      } else if (this.movingOffsetY !== 0) {
        this.movingOffsetY += this.movingDirection * 6;
        if (this.movingOffsetY == 0) {
          this.moving = 0;
          this.checkForFinish();
        }
      }
    }
  }

  checkForFinish() {
    if (this.randomMovements <= 0) {
      let correctTiles = 0;
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {
          if (this.map[i][j] == ((((i * 3) + j) + 1) % 9)) {
            correctTiles++;
          }
        }
      }
      if (correctTiles === 9) {
        this.currentEvent = 9;
      }
    }
  }

  draw() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] !== 0) {
          let offsetX = 0;
          let offsetY = 0;
          if (this.map[i][j] === this.moving) {
            offsetX = this.movingOffsetX;
            offsetY = this.movingOffsetY;
          }
          this.game.options.canvasContext.drawImage(this.image, ((this.map[i][j] - 1) % 3) * 134, Math.floor((this.map[i][j] - 1) / 3) * 134, 134, 134, j * 134 + offsetX + 100, i * 134 + offsetY + 39, 134, 134);
        }
      }
    }
    this.game.options.canvasContext.drawImage(this.image, 600, 50, 150, 150);
  }

  moveUp() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] === 0) {
          if (i < 2 && this.moving === 0) {
            this.moving = this.map[i + 1][j];
            this.movingOffsetY = 132;
            this.movingDirection = -1;
            this.map[i + 1][j] = 0;
            this.map[i][j] = this.moving;
            return true;
          }
        }
      }
    }
    return false;
  }

  moveDown() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] === 0) {
          if (i > 0 && this.moving === 0) {
            this.moving = this.map[i - 1][j];
            this.movingOffsetY = -132;
            this.movingDirection = 1;
            this.map[i - 1][j] = 0;
            this.map[i][j] = this.moving;
            return true;
          }
        }
      }
    }
    return false;
  }

  moveLeft() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] == 0) {
          if (j < 2 && this.moving == 0) {
            this.moving = this.map[i][j + 1];
            this.movingOffsetX = 132;
            this.movingDirection = -1;
            this.map[i][j + 1] = 0;
            this.map[i][j] = this.moving;
            return true;
          }
        }
      }
    }
    return false;
  }

  moveRight() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.map[i][j] == 0) {
          if (j > 0 && this.moving == 0) {
            this.moving = this.map[i][j - 1];
            this.movingOffsetX = -132;
            this.movingDirection = 1;
            this.map[i][j - 1] = 0;
            this.map[i][j] = this.moving;
            return true;
          }
        }
      }
    }
    return false;
  }

  helpTextIsReady(eventNumber: number) {
    switch (eventNumber) {
      case 1: this.currentEvent = 2;
        break;
      case 2: this.currentEvent = 3;
        break;
      case 3: this.currentEvent = 4;
        break;
      case 4: this.currentEvent = 5;
        break;
      case 5: this.currentEvent = 6;
        break;
      case 9: this.nextLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0 && this.moving === 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Mein Bild von der Kreatur in meiner Zauberkugel ist durcheinander geraten.", 1);
            break;
          case 2: this.showHelpText("Verschiebe die Kacheln so, dass das Bild richtig zusammengesetzt ist.", 2);
            break;
          case 3: this.showHelpText("Wie es richtig aussieht, siest du in klein rechts oben.",3);
            break;
          case 4: this.showHelpText("Verschieben kannst du, indem du in die Richtung drückst, in welche eine Kachel",4);
            break;
          case 5: this.showHelpText("in die freie Stelle geschoben werden soll. Probier es einfach aus.", 5);
            break;
          case 6: this.showHelpText("Kleiner Tipp: Die freie Stelle muss am Ende unten rechts sein.", 6);
            break;
          case 7: this.showHelpText("Noch ein Tipp: Fange mit der Ecke oben links an, mache dann den oberen Rest.", 7);
            break;
          case 8: this.showHelpText("Danach am besten die linke Mitte und links unten gleichzeitig.", 8);
            break;
          case 9: this.showHelpText("Super, du hast es geschafft.", 9);
            break;
        }
      } else {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Ich kann nicht erkennen, was für eine Zelle da in deinem Körper ist", 1);
            break;
          case 2: this.showHelpText("Verschiebe die Kacheln so, dass das Bild richtig zusammengesetzt ist.", 2);
            break;
          case 3: this.showHelpText("Wie es richtig aussieht, siest du in klein rechts oben.", 3);
            break;
          case 4: this.showHelpText("Verschieben kannst du, indem du in die Richtung drückst, in welche eine Kachel", 4);
            break;
          case 5: this.showHelpText("in die freie Stelle geschoben werden soll. Probier es einfach aus.", 5);
            break;
          case 6: this.showHelpText("Kleiner Tipp: Die freie Stelle muss am Ende unten rechts sein.", 6);
            break;
          case 7: this.showHelpText("Noch ein Tipp: Fange mit der Ecke oben links an, mache dann den oberen Rest.", 7);
            break;
          case 8: this.showHelpText("Dann am besten die linke Mitte und links unten gleichzeitig.", 8);
            break;
          case 9: this.showHelpText("Super, du hast es geschafft.", 9);
            break;
        }
      }
      this.currentEvent = 0;
    }
  }
}
