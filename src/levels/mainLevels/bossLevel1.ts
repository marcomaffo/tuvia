import Game, { PlayType } from "../../game";
import PlayerStats from "../../playerStats";
import Boss1 from "../../enemies/boss1";
import CellBoss1 from "../../enemies/cellBoss1";
import PowerUp from "../../powerUp";
import RunLevel from "../runLevel";
import { KeyboardState } from "../../keyboard";

export default class BossLevel1 extends RunLevel {
  bossCellTex: HTMLImageElement;
  powerUpTex: HTMLImageElement;
  boss: Boss1;

  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
    
    this.initialzeEverything();

    this.boss = new Boss1(520, 280, this, this.game.options);
    this.enemies.push(this.boss);
  }

  level1 = [ [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ],
                  [ 4, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 29, 30, 31, 30, 31, 10, 11, 4 ],
                  [ 4, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 43, 42, 43, 22, 23, 4 ],
                  [ 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 30, 31, 30, 31, 10, 11, 4 ],
                  [ 4, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 43, 42, 43, 22, 23, 4 ],
                  [ 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 30, 31, 30, 31, 10, 11, 4 ],
                  [ 4, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 43, 42, 43, 22, 23, 4 ],
                  [ 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 30, 31, 30, 31, 10, 11, 4 ],
                  [ 4, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 43, 42, 43, 22, 23, 4 ],
                  [ 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 30, 31, 30, 31, 10, 11, 4 ],
                  [ 4, 48, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 41, 42, 43, 42, 43, 22, 23, 4 ],
                  [ 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 3, 2, 3, 2, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 14, 15, 14, 15, 14, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];


  powerUpPointsX = [120, 240, 360, 480, 600];

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.checkBossCells();
    this.updateLevel(elapsedMillis, keyboardState);
    if (this.enemies.length === 0) {
      this.currentEvent = 1;
    }
  }

  draw() {
    this.drawLevel();
  }

  loadAditionalContent(bossNormalTexture: HTMLImageElement, bossZelle: HTMLImageElement, powerUpTex: HTMLImageElement, stars: HTMLImageElement) {
    this.boss.loadBossContent(bossNormalTexture, stars);
    this.powerUpTex = powerUpTex;
    this.bossCellTex = bossZelle;
  }

  throwNewCell() {
    const bossCell = new CellBoss1(this.boss.position.x + 40, this.boss.position.y + 40, this.player.posXOnMap, this.player.posYOnMap, this.game.options);
    bossCell.loadContent(this.bossCellTex);
    this.enemies.push(bossCell);
  }

  checkBossCells() {
    const toDeleteBossCells: CellBoss1[] = Array();
    for (const enemyCell of this.enemies) {
      if (enemyCell instanceof CellBoss1 && enemyCell.position.y > 440) {
        toDeleteBossCells.push(enemyCell);
      }
    }
    this.enemies = this.enemies.filter(enemy => !toDeleteBossCells.some(toDeleteBossCell => toDeleteBossCell === enemy));
  }

  createPowerup() {
    this.powerUps = new Array(1);
    const randomPosition = Math.floor(Math.random() * 5);
    this.powerUps[0] = new PowerUp(0, this.powerUpPointsX[randomPosition], 400, this.game.options.canvasContext);
    this.powerUps[0].loadContent(this.powerUpTex);
  }

  removePowerups() {
    this.powerUps = [];
  }

  helpTextIsReady(eventNumber: number) {
    switch (eventNumber) {
      case 1: this.currentEvent = 2;
          break;
      case 2: this.currentEvent = 3;
          break;
      case 3: this.currentEvent = 4;
          break;
      case 4: this.playerStats.fill();
          this.playerStats.isDrawn = false;
          this.nextLevel();
          break;
      case 99: this.restartLevel();
          break;
    }
  }

  checkForEvent() {
    if (this.currentEvent != 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Super, du hast den Troll besiegt! Aber das reicht nicht.", 1);
              break;
          case 2: this.showHelpText("Wir müssen den Magier aufhalten, sonst macht er noch mehr Schaden.", 2);
              break;
          case 3: this.showHelpText("Um zu seinem Schloss zu gelangen, müssen wir durch den Sumpf.", 3);
              break;
          case 4: this.showHelpText("Am schnellsten kommen wir über den Fluss dorthin, los schnapp dir ein Floß!", 4);
              break;
          }
      } else {
        switch (this.currentEvent) {
            case 1: this.showHelpText("Sehr gut, du hast die Metastase zerstört, so kann sich diese nicht weiter in deinem", 1);
                break;
            case 2: this.showHelpText("Körper verbreiten. Diese kommt von einem Tumor, den müssen wir finden.", 2);
                break;
            case 3: this.showHelpText("Es scheint, als sei die Metastase über dein Lymphsystem hierhin gelangt.", 3);
                break;
            case 4: this.showHelpText("Am besten wir gehen dahin und schauen nach, ob dort weitere Krebszellen sind!", 4);
                break;
        }
      }

      // prevent shooting a bullet while pressing the space bar
      this.lastBulletEmitted = 0;
    }
  }
}
