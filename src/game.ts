import SlidingPuzzle from "./levels/slidingPuzzle";
import SurfLevel from "./levels/surfGame/surflevel";
import ComicIntro from "./levels/comicIntro";
import BossLevel1 from "./levels/mainLevels/bossLevel1";
import BossLevel2 from "./levels/mainLevels/bossLevel2";
import BossLevel3 from "./levels/mainLevels/bossLevel3";
import Level1 from "./levels/mainLevels/level1";
import Level2 from "./levels/mainLevels/level2";
import Level3 from "./levels/mainLevels/level3";
import Level4 from "./levels/mainLevels/level4";
import Level5 from "./levels/mainLevels/level5";
import Level6 from "./levels/mainLevels/level6";
import Level7 from "./levels/mainLevels/level7";
import Level8 from "./levels/mainLevels/level8";
import Level9 from "./levels/mainLevels/level9";
import PlayerStats from "./playerStats";
import Rectangle from "./rectangle";
import ImageHelper from "./imageHelper";
import Keyboard from "./keyboard";
import Color from "./color";
import AllLevelSuperClass from "./levels/allLevelSuperClass";

enum GameState {
  Menu,
  MenuChoosePlayType,
  Level,
  Paused,
  Loading,
};

export enum PlayType {
  CancerSetting,
  KnightSetting,
}

export type GameOptions = {
  screenWidth: number;
  screenHeight: number;
  imageDirectory: string;
  canvasContext: CanvasRenderingContext2D;
  fps: number;
}

export type ImageLoadStatus = {
  ready: boolean;
  loaded: number;
  max: number;
};

export default class Game {
  options: GameOptions;
  
  constructor(options: GameOptions) {
    this.options = options;
    this.playerStats = new PlayerStats(this.options);
  }

  keyboard: Keyboard = new Keyboard();
  startUpdateTime = 0;
  helperImage: HTMLImageElement;
  spaceImage: HTMLImageElement;
  screenImage: HTMLImageElement;
  cancerImage: HTMLImageElement;
  medievalImage: HTMLImageElement;

  helperImageRect: Rectangle;
  spaceRect: Rectangle;

  charset: HTMLImageElement;
  bulletIcon: HTMLImageElement;
  levelTileset1: HTMLImageElement;
  levelTileset2: HTMLImageElement;
  levelTileset3: HTMLImageElement;
  powerUp1: HTMLImageElement;
  powerUp2: HTMLImageElement;
  powerUp3: HTMLImageElement;
  enemyWalking: HTMLImageElement;
  enemyFloor: HTMLImageElement;
  enemyThrowing: HTMLImageElement;
  enemyFlying: HTMLImageElement;
  stone: HTMLImageElement;
  comicImage: HTMLImageElement;
  movingCardImage: HTMLImageElement;
  boss1Rotation: HTMLImageElement;
  boss1Body: HTMLImageElement;
  boss1Stone: HTMLImageElement;
  boss1Stars: HTMLImageElement;
  surfRaft: HTMLImageElement;
  surfStone: HTMLImageElement;
  surfRiver: HTMLImageElement;
  surfTrunk: HTMLImageElement;
  surfEnemy: HTMLImageElement;
  boss2Body: HTMLImageElement;
  boss2Wheel: HTMLImageElement;
  boss3Body: HTMLImageElement;
  boss3Fire: HTMLImageElement;

  tileRectangles: Rectangle[];

  currentLevel: AllLevelSuperClass;
  currentLevelNumber = 14;

  imgsLoadedObj: { loaded: number, ready: boolean, max: number } = { loaded: 0, ready: false, max: 0 };
  playType: PlayType;

  textShowing = false;
  timeSinceLastLetter = 0;
  currentEvent: number;
  helpTextCharacterCount: number;
  lettersPrinted = 0;
  words: string[];
  colorState = 0;
  colorDirection = 1;

  menuSelection = 0;
  gameState = GameState.Menu;
  keyDown = false;

  playerStats: PlayerStats;

  initialize() {
    this.tileRectangles = new Array(72);
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 12; j++) {
        this.tileRectangles[i * 12 + j] = new Rectangle(j * 40, i * 40, 40, 40);
      }
    }
    this.loadBaseContent();
  }

  loadBaseContent() {
    ImageHelper.loadImages([
      this.options.imageDirectory + "coverCancer.jpg",
      this.options.imageDirectory + "coverKnight.jpg",
      this.options.imageDirectory + "mainCover.jpg"
    ]).then((images) => this.setBaseContent(images));
  }

  setBaseContent(imgs: HTMLImageElement[]) {
    this.cancerImage = imgs[0];
    this.medievalImage = imgs[1];
    this.screenImage = imgs[2];

    this.update(1);
  }

  loadGameContent(playType: PlayType) {
    ImageHelper.loadImages([
      this.options.imageDirectory + "powerUp.png",
      this.options.imageDirectory + "stone.png",
      this.options.imageDirectory + "space.png"
    ]).then((imgs) => {
      this.loadSpecificImages(imgs, playType);
    });
  }

  loadSpecificImages = (imgs: HTMLImageElement[], playType: PlayType) => {
    this.powerUp3 = imgs[0];
    this.stone = imgs[1];
    this.spaceImage = imgs[2];

    let setting: string = '';
    this.playType = playType;
    switch (playType) {
      case PlayType.KnightSetting: 
        setting = 'knightSetting';
        break;
      case PlayType.CancerSetting: 
        setting = 'cancerSetting';
        break;
    }
    ImageHelper.loadImages([
      this.options.imageDirectory + setting + "/helper.png",
      this.options.imageDirectory + setting + "/player.png",
      this.options.imageDirectory + setting + "/bullet.png",
      this.options.imageDirectory + setting + "/level/level1.png",
      this.options.imageDirectory + setting + "/level/level2.png",
      this.options.imageDirectory + setting + "/level/level3.png",
      this.options.imageDirectory + setting + "/powerUp1.png",
      this.options.imageDirectory + setting + "/powerUp2.png",
      this.options.imageDirectory + setting + "/enemies/enemyRunning.png",
      this.options.imageDirectory + setting + "/enemies/enemyFloor.png",
      this.options.imageDirectory + setting + "/enemies/enemyThrowing.png",
      this.options.imageDirectory + setting + "/enemies/enemyFlying.png",
      this.options.imageDirectory + setting + "/comic.jpg",
      this.options.imageDirectory + setting + "/enemyCard.jpg",
      this.options.imageDirectory + setting + "/bosses/boss1Rotation.png",
      this.options.imageDirectory + setting + "/bosses/boss1Animated.png",
      this.options.imageDirectory + setting + "/bosses/boss1Stone.png",
      this.options.imageDirectory + "stars.png",
      this.options.imageDirectory + setting + "/surfLevel/player.png",
      this.options.imageDirectory + setting + "/surfLevel/obstacle1.png",
      this.options.imageDirectory + setting + "/surfLevel/background.png",
      this.options.imageDirectory + setting + "/surfLevel/obstacle2.png",
      this.options.imageDirectory + setting + "/surfLevel/enemy.png",
      this.options.imageDirectory + setting + "/bosses/boss2.png",
      this.options.imageDirectory + setting + "/bosses/boss2Wheel.png",
      this.options.imageDirectory + setting + "/bosses/boss3.png",
      this.options.imageDirectory + setting + "/bosses/boss3Fire.png",
    ], this.imgsLoadedObj).then((images) => this.setSpecificImages(images));
  }

  setSpecificImages(imgs: HTMLImageElement[]) {
    this.helperImage = imgs[0];
    this.charset = imgs[1];
    this.bulletIcon = imgs[2];
    this.levelTileset1 = imgs[3];
    this.levelTileset2 = imgs[4];
    this.levelTileset3 = imgs[5];
    this.powerUp1 = imgs[6];
    this.powerUp2 = imgs[7];
    this.enemyWalking = imgs[8];
    this.enemyFloor = imgs[9];
    this.enemyThrowing = imgs[10];
    this.enemyFlying = imgs[11];
    this.comicImage = imgs[12];
    this.movingCardImage = imgs[13];
    this.boss1Rotation = imgs[14];
    this.boss1Body = imgs[15];
    this.boss1Stone = imgs[16];
    this.boss1Stars = imgs[17];
    this.surfRaft = imgs[18];
    this.surfStone = imgs[19];
    this.surfRiver = imgs[20];
    this.surfTrunk = imgs[21];
    this.surfEnemy = imgs[22];
    this.boss2Body = imgs[23];
    this.boss2Wheel = imgs[24];
    this.boss3Body = imgs[25];
    this.boss3Fire = imgs[26];
    this.helperImageRect = new Rectangle(20, 20, this.helperImage.width, this.helperImage.height);
    this.spaceRect = new Rectangle((20 + this.helperImage.width - this.spaceImage.width) / 2, 20 + this.helperImage.height, this.spaceImage.width, this.spaceImage.height);

    this.imgsLoadedObj.ready = true;
  }

  loadLevel(levelNumber: number) {
    this.textShowing = false;
    switch (levelNumber) {
      case 0:
          const comicintro = new ComicIntro(this.playerStats,this);
          comicintro.loadContent(this.comicImage, this.spaceImage);
          this.currentLevel = comicintro;
        break;
      case 1:
          const level1 = new Level1(this.playerStats, this);
          level1.loadContent(this.levelTileset1, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level1;
          break;
      case 2:
          const slidingPuzzle = new SlidingPuzzle(this.playerStats, this);
          slidingPuzzle.loadContent(this.movingCardImage);
          this.currentLevel = slidingPuzzle;
        break;
      case 3: 
          const level2 = new Level2(this.playerStats, this);
          level2.loadContent(this.levelTileset1, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level2;
        break;
      case 4: 
          const level3 = new Level3(this.playerStats, this);
          level3.loadContent(this.levelTileset1, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level3;
        break;
      case 5: 
          const bosslevel1 = new BossLevel1(this.playerStats, this);
          bosslevel1.loadContent(this.levelTileset1, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          bosslevel1.loadAditionalContent(this.boss1Rotation, this.boss1Body, this.boss1Stone, this.powerUp1, this.boss1Stars);
          this.currentLevel = bosslevel1;
        break;
      case 6: 
          const surfLevel = new SurfLevel(this.playerStats, this);
          surfLevel.loadContent(this.surfRaft, this.surfStone, this.surfRiver, this.surfTrunk, this.surfEnemy);
          this.currentLevel = surfLevel;
        break;
      case 7: 
          const level4 = new Level4(this.playerStats, this);
          level4.loadContent(this.levelTileset2, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level4;
        break;
      case 8: 
          const level5 = new Level5(this.playerStats, this);
          level5.loadContent(this.levelTileset2, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level5;
        break;
      case 9: 
          const level6 = new Level6(this.playerStats, this);
          level6.loadContent(this.levelTileset2, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level6;
        break;
      case 10: 
          const bosslevel2 = new BossLevel2(this.playerStats, this);
          bosslevel2.loadContent(this.levelTileset2, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          bosslevel2.loadAditionalContent(this.boss2Body, this.boss2Wheel, this.powerUp1);
          this.currentLevel = bosslevel2;
        break;
      case 11: 
          const level7 = new Level7(this.playerStats, this);
          level7.loadContent(this.levelTileset3, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level7;
        break;
      case 12: 
          const level8 = new Level8(this.playerStats, this);
          level8.loadContent(this.levelTileset3, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level8;
        break;
      case 13: 
          const level9 = new Level9(this.playerStats, this);
          level9.loadContent(this.levelTileset3, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          this.currentLevel = level9;
        break;
      case 14: 
          const bosslevel3 = new BossLevel3(this.playerStats, this);
          bosslevel3.loadContent(this.levelTileset3, this.charset, this.bulletIcon, this.powerUp1, this.powerUp2, this.powerUp3, this.tileRectangles, this.enemyWalking, this.enemyFloor, this.enemyThrowing, this.stone, this.enemyFlying);
          bosslevel3.loadAditionalContent(this.boss3Body, this.boss3Fire, this.powerUp1);
          this.currentLevel = bosslevel3;
        break;
    }
  }

  update(elapsedMillis: number) {
    this.startUpdateTime = performance.now();
    if (this.keyboard.keysDown === 0) {
      this.keyDown = false;
    }
    switch (this.gameState) {
      case GameState.Menu:
        this.colorState = this.colorState + (8 * this.colorDirection);
        if (this.colorState > 255) {
          this.colorDirection *= -1;
          this.colorState = 255;
        } else if (this.colorState < 0) {
          this.colorDirection *= -1;
          this.colorState = 0;
        }
        if (!this.keyDown) {
          if (this.keyboard.state.enter) {
            if (this.menuSelection === 0) {
              this.gameState = GameState.MenuChoosePlayType;
              this.keyDown = true;
            }
          }
        }
        break;
      case GameState.MenuChoosePlayType:
        this.colorState = this.colorState + (8 * this.colorDirection);
        if (this.colorState > 255) {
          this.colorDirection *= -1;
          this.colorState = 255;
        } else if (this.colorState < 0) {
          this.colorDirection *= -1;
          this.colorState = 0;
        }
        if (!this.keyDown) {
          if (this.keyboard.state.left || this.keyboard.state.right) {
            this.menuSelection = (this.menuSelection + 1) % 2;
            this.keyDown = true;
          } else if (this.keyboard.state.enter) {
            this.loadGameContent(this.menuSelection === 0 ? PlayType.KnightSetting : PlayType.CancerSetting);
            this.gameState = GameState.Loading;
            this.keyDown = true;
          } else if (this.keyboard.state.escape) {
            this.menuSelection = 0;
            this.gameState = GameState.Menu;
            this.keyDown = true;
          }
        }
        break;
      case GameState.Loading:
        if (this.imgsLoadedObj.ready) {
          this.imgsLoadedObj = { loaded: 0, ready: false, max: 0 };
          this.loadLevel(this.currentLevelNumber);
          this.gameState = GameState.Level;
        }
        break;
      case GameState.Level:
        if (this.keyboard.state.escape && !this.keyDown) {
          this.gameState = GameState.Paused;
          this.menuSelection = 0;
          this.keyDown = true;
        } else {
          if (!this.textShowing) {
            this.currentLevel.update(elapsedMillis, this.keyboard.state);
          } else {
            this.updateHelperText(elapsedMillis);
          }
        }
        break;
      case GameState.Paused:
        this.colorState = this.colorState + (8 * this.colorDirection);
        if (this.colorState > 255) {
            this.colorDirection *= -1;
            this.colorState = 255;
        } else if (this.colorState < 0) {
            this.colorDirection *= -1;
            this.colorState = 0;
        }
        if (!this.keyDown) {
          if (this.keyboard.state.up) {
            this.menuSelection--;
            if (this.menuSelection < 0) {
              this.menuSelection = 2;
            }
            this.keyDown = true;
          } else if (this.keyboard.state.down) {
            this.menuSelection = (this.menuSelection + 1) % 3;
            this.keyDown = true;
          } else if (this.keyboard.state.enter) {
            if (this.menuSelection === 0) {
              this.gameState = GameState.Level;
            } else if (this.menuSelection === 1) {
              this.gameState = GameState.Level;
              this.restartLevel();
            } else {
              this.gameState = GameState.Menu;
              this.menuSelection = 0;
              this.currentLevelNumber = 0;
              this.keyDown = true;
            }
          } else if (this.keyboard.state.escape) {
            this.gameState = GameState.Level;
            this.keyDown = true;
          }
      }
      break;
    }
    this.draw();
  }

  draw() {
    this.options.canvasContext.fillStyle = "#0174DF";
    this.options.canvasContext.fillRect(0, 0, this.options.screenWidth, this.options.screenHeight);

    switch (this.gameState) {
      case GameState.Menu:
        let startColor = new Color(255, 255, 255);
        if (this.menuSelection === 0) {
          startColor = new Color(255, this.colorState, this.colorState);
        }
        this.options.canvasContext.font = "30px Arial";
        this.options.canvasContext.drawImage(this.screenImage, 0, 0, this.options.screenWidth, this.options.screenHeight);
        this.options.canvasContext.fillStyle = startColor.toString();
        this.options.canvasContext.fillText("Starten", 600, 300);
      break;
      case GameState.MenuChoosePlayType:
        let rColor = new Color(255, 255, 255, 0.2);
        let gColor = new Color(255, 255, 255, 0.2);
        if (this.menuSelection === 0) {
          gColor = new Color(this.colorState / 2 + 127, this.colorState / 2 + 127, this.colorState / 2 + 127, 0.2);
        } else if (this.menuSelection === 1) {
          rColor = new Color(this.colorState / 2 + 127, this.colorState / 2 + 127, this.colorState / 2 + 127, 0.2);
        }
        this.options.canvasContext.drawImage(this.medievalImage, 0, 0, this.options.screenWidth / 2, this.options.screenHeight);
        this.options.canvasContext.fillStyle = gColor.toString();
        this.options.canvasContext.fillRect(0, 0, this.options.screenWidth / 2, this.options.screenHeight);

        this.options.canvasContext.drawImage(this.cancerImage, this.options.screenWidth / 2, 0, this.options.screenWidth / 2, this.options.screenHeight);
        this.options.canvasContext.fillStyle = rColor.toString();
        this.options.canvasContext.fillRect(this.options.screenWidth / 2, 0, this.options.screenWidth / 2, this.options.screenHeight);
      break;
      case GameState.Level:
        this.currentLevel.draw();
        if (this.textShowing) {
          this.drawHelper();
        }
        this.playerStats.draw();
      break;
      case GameState.Paused:
          this.currentLevel.draw();
          if (this.textShowing) {
            this.drawHelper();
          }
          this.playerStats.draw();
          const menuBackgroundColor = new Color(0, 0, 255, 0.5);
          this.options.canvasContext.fillStyle = menuBackgroundColor.toString();
          this.options.canvasContext.fillRect(0, 0, this.options.screenWidth, this.options.screenHeight);

          let continueColor = new Color(255, 255, 255);
          let restartColor = new Color(255, 255, 255);
          let endColor = new Color(255, 255, 255);
          if (this.menuSelection === 0) {
            continueColor = new Color(255, this.colorState, this.colorState);
          } else if (this.menuSelection === 1) {
            restartColor = new Color(255, this.colorState, this.colorState);
          } else {
            endColor = new Color(255, this.colorState, this.colorState);
          }
          this.options.canvasContext.font = "30px Arial";
          this.options.canvasContext.fillStyle = continueColor.toString();
          let s = "Fortsetzen";
          this.options.canvasContext.fillText(s, this.options.screenWidth / 2 - this.options.canvasContext.measureText(s).width / 2, this.options.screenHeight / 2 - 40);
          this.options.canvasContext.fillStyle = restartColor.toString();
          s = "Neu Starten";
          this.options.canvasContext.fillText(s, this.options.screenWidth / 2 - this.options.canvasContext.measureText(s).width / 2, this.options.screenHeight / 2);
          this.options.canvasContext.fillStyle = endColor.toString();
          s = "Beenden";
          this.options.canvasContext.fillText(s, this.options.screenWidth / 2 - this.options.canvasContext.measureText(s).width / 2, this.options.screenHeight / 2 + 40);
        break;
      case GameState.Loading:
        this.options.canvasContext.font = "30px Arial";
        const text = "Bilder geladen: " + this.imgsLoadedObj.loaded + " von " + this.imgsLoadedObj.max;
        this.options.canvasContext.fillStyle = "#FFFFFF";
        this.options.canvasContext.fillText(text, this.options.screenWidth / 2 - this.options.canvasContext.measureText(text).width / 2, this.options.screenHeight / 2);
        break;
    }
    const runTime = Math.round(performance.now() - this.startUpdateTime);
    const timeoutTime = (1000 / this.options.fps - runTime) < 1 ? 1 : (1000 / this.options.fps - runTime);
    setTimeout(() => this.update(timeoutTime + runTime), timeoutTime);
  }

  nextLevel() {
    this.currentLevelNumber++;
    this.loadLevel(this.currentLevelNumber);
  }

  drawHelpText(text: string, eventNumber: number) {
    this.textShowing = true;
    this.lettersPrinted = 1;
    this.timeSinceLastLetter = 0;
    this.currentEvent = eventNumber;
    this.helpTextCharacterCount = text.length;
    this.words = text.split(" ");
  }

  restartLevel() {
    this.playerStats.fill();
    this.loadLevel(this.currentLevelNumber);
  }

  drawHelper() {
    this.options.canvasContext.font = "20px Arial";
    this.options.canvasContext.drawImage(this.helperImage, this.helperImageRect.x, this.helperImageRect.y, this.helperImageRect.width, this.helperImageRect.height);
    if (this.lettersPrinted >= this.helpTextCharacterCount) {
      this.options.canvasContext.drawImage(this.spaceImage, this.spaceRect.x, this.spaceRect.y, this.spaceRect.width, this.spaceRect.height);
    }

    const lines = new Array();
    let currentPosition = 0;
    let currentWord = 0;

    let line = "";

    while (currentPosition < this.lettersPrinted) {
      const wordsCount = this.words[currentWord].length;
      if ((currentPosition + wordsCount) > this.lettersPrinted) {
        const cutWord = this.words[currentWord].substring(0, this.lettersPrinted - currentPosition);
        if ((this.options.canvasContext.measureText(line).width + this.options.canvasContext.measureText(cutWord).width) > 196) {
            lines.push(line);
            line = "";
        }
        line += cutWord;
        currentPosition += this.lettersPrinted - currentPosition;
      } else {
        if ((this.options.canvasContext.measureText(line).width + this.options.canvasContext.measureText(this.words[currentWord] + " ").width) > 198) {
            lines.push(line);
            line = "";
        }
        line += this.words[currentWord] + " ";
        currentPosition += (this.words[currentWord].length + 1);
        currentWord++;
      }
    }
    lines.push(line);

    let lineNumber = 0;
    for (const line of lines) {
      this.options.canvasContext.fillStyle = "#000000";
      this.options.canvasContext.fillText(line, 30, (lineNumber + 2) * 25);
      lineNumber++;
    }
  }

  updateHelperText(elapsedMillis: number) {
    if (this.lettersPrinted >= this.helpTextCharacterCount) {
      if (this.keyboard.state.space) {
        this.textShowing = false;
        this.currentLevel.helpTextIsReady(this.currentEvent);
      }
    } else {
      this.timeSinceLastLetter += elapsedMillis;
      if (this.timeSinceLastLetter > 1) {
        this.lettersPrinted++;
        this.timeSinceLastLetter -= 1;
      }
    }
  }

  gameOver() {
    this.gameState = GameState.Menu;
    this.currentLevelNumber = 0;
    this.menuSelection = 0;
  }
}