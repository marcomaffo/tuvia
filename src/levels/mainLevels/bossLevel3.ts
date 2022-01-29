import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import Boss3 from "../../enemies/boss3";
import FireBoss3 from "../../enemies/fireBoss3";
import PowerUp from "../../powerUp";
import Game, { PlayType } from "../../game";
import { KeyboardState } from "../../keyboard";

export default class BossLevel3 extends RunLevel {
  boss: Boss3;

  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
    this.initialzeEverything();
    
    this.boss = new Boss3(600, 60, this, this.game.options);
    this.enemies.push(this.boss);
  }

  powerUpTex: HTMLImageElement;
  fireTex: HTMLImageElement;
  timeSinceLastPowerup = 0;

  level1 = [ [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17 ],
                  [ 5, 0, 0, 0, 26, 14, 27, 0, 0, 0, 0, 0, 26, 14, 27, 0, 0, 0, 0, 4 ],
                  [ 17, 0, 0, 0, 13, 4, 24, 0, 0, 26, 14, 27, 13, 4, 24, 0, 0, 0, 0, 16 ],
                  [ 5, 0, 26, 14, 38, 2, 39, 0, 0, 13, 4, 24, 38, 2, 39, 0, 26, 14, 27, 4 ],
                  [ 17, 0, 13, 4, 24, 0, 26, 14, 27, 38, 2, 39, 0, 0, 0, 0, 13, 4, 24, 16 ],
                  [ 5, 0, 38, 2, 39, 0, 13, 4, 24, 0, 0, 0, 0, 26, 14, 27, 38, 2, 39, 4 ],
                  [ 17, 0, 0, 0, 26, 14, 38, 2, 39, 26, 14, 27, 0, 13, 4, 24, 0, 0, 0, 16 ],
                  [ 5, 0, 0, 0, 13, 4, 24, 0, 0, 13, 4, 24, 0, 38, 2, 39, 0, 0, 0, 4 ],
                  [ 17, 4, 0, 0, 38, 2, 39, 0, 0, 38, 2, 39, 0, 0, 0, 0, 0, 0, 4, 16 ],
                  [ 5, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 16 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 0 ],
                  [ 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0 ],
                  [ 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 24, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0 ],
                  [ 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0 ],
                  [ 0, 12, 0, 0, 0, 0, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 48, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0 ],
                  [ 0, 0, 48, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0, 0 ],
                  [ 0, 0, 0, 48, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 49, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true ],
                  [ true, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true ],
                  [ true, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, true ],
                  [ true, false, false, false, false, true, false, false, false, false, true, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
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
                  [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];


  addFireList = new Array();

  powerUpPoints = [[ 575, 240 ], [ 415, 120 ], [ 95, 360 ], [ 695, 360 ], [ 135, 160 ]];

  loadAditionalContent(bossTexture: HTMLImageElement, fireTex: HTMLImageElement, powerUpTex: HTMLImageElement) {
    this.boss.loadContent(bossTexture);
    this.powerUpTex = powerUpTex;
    this.fireTex = fireTex;
  }

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.timeSinceLastPowerup += elapsedMillis;
    if (this.timeSinceLastPowerup > 8000) {
      if (this.powerUps.length !== 1) {
        this.createPowerup();
        this.timeSinceLastPowerup = 0;
      }
    }

    this.checkFires();
    this.updateLevel(elapsedMillis, keyboardState);
    if (this.enemies.length === 0 && this.currentEvent === 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        this.showHelpText("Du hast den bösen Magier besiegt!!!", 1);
      } else {
        this.showHelpText("Du hast den Tumor und alle Krebszellen besiegt!!!", 1);
      }
    }
  }

  draw() {
    this.drawLevel();
  }

  fire() {
    let fireXPosition: number;
    let direction: 1 | -1;
    if (this.boss.lookingDirection === 0) {
      fireXPosition = this.boss.position.x + 20;
      direction = -1;
    } else {
      fireXPosition = this.boss.position.x + this.boss.position.width - 30;
      direction = 1;
    }
    const bossFire = new FireBoss3(fireXPosition, this.boss.position.y + 30, direction, this.game.options);
    bossFire.loadContent(this.fireTex);
    this.enemies.push(bossFire);
  }

  checkFires() {
    const toDeleteBossFires: FireBoss3[] = Array();
    for (const enemyFire of this.enemies) {
      if (enemyFire instanceof FireBoss3 && (enemyFire.position.x < 40 || enemyFire.position.x > 740)) {
        toDeleteBossFires.push(enemyFire);
      }
    }
    this.enemies = this.enemies.filter(enemy => !toDeleteBossFires.some(toDeleteBossFire => toDeleteBossFire === enemy));
  }

  createPowerup() {
    this.powerUps = new Array();
    const randomPosition = Math.floor(Math.random() * 5);
    this.powerUps.push(new PowerUp(0, this.powerUpPoints[randomPosition][0], this.powerUpPoints[randomPosition][1], this.game.options.canvasContext));
    this.powerUps[0].loadContent(this.powerUpTex);
  }

  helpTextIsReady(eventNumber: number) {
    switch (eventNumber) {
      case 1:
        this.currentEvent = 2;
        break;
      case 2:
        this.game.gameOver();
        break;
      case 99:
        this.restartLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 2:
            this.showHelpText("Dank dir können die Dorfbewohner wieder in Frieden leben!!!", 2);
            break;
        }
      } else {
        switch (this.currentEvent) {
          case 2:
            this.showHelpText("Bald wird es dir wieder wie vor der Krebserkrankung gehen!!!", 2);
            break;
        }
      }
    }
  }
}
