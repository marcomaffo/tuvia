import RunLevel from "../runLevel";
import Boss2 from "../../enemies/boss2";
import PowerUp from "../../powerUp";
import Game, { PlayType } from "../../game";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class BossLevel2 extends RunLevel {
  boss: Boss2;
  powerUpPointsX = [[ 270, 240 ], [ 600, 360 ], [ 550, 160 ]];
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game, 0.05);
    
    this.initialzeEverything();

    this.boss = new Boss2(450, 320, this, this.game.options);
    this.enemies.push(this.boss);
  }
  powerUpTex: HTMLImageElement;

  level1 = [ [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 14, 15, 14, 15, 27, 0, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 4, 4, 4, 4, 12, 0, 16, 17 ],
                  [ 4, 5, 0, 0, 26, 14, 15, 14, 15, 27, 0, 38, 2, 3, 2, 3, 39, 0, 4, 5 ],
                  [ 16, 17, 0, 0, 13, 4, 4, 4, 4, 12, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 4, 5, 0, 0, 38, 2, 3, 2, 3, 39, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 37, 0, 0 ],
                  [ 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0 ],
                  [ 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0 ],
                  [ 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0 ],
                  [ 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 48, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 49, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  loadAditionalContent(bossTexture: HTMLImageElement, bossLegs: HTMLImageElement, powerUpTex: HTMLImageElement) {
    this.boss.loadBossContent(bossTexture, bossLegs);
    this.powerUpTex = powerUpTex;
  }

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.updateLevel(elapsedMillis, keyboardState);
    if (this.enemies.length === 0) {
      if (this.game.playType === PlayType.KnightSetting)
        this.showHelpText("Du hast den Torwächter besiegt, nun ist der Weg zur Burg frei!!!", 1);
      else
        this.showHelpText("Du hast die Metastase besiegt, nun können wir zum Tumor im Gehirn!!!", 1);
    }
  }

  draw() {
    this.drawLevel();
  }

  createPowerup() {
      this.powerUps = new Array();
      const randomPosition = Math.floor(Math.random() * 3);
      this.powerUps.push(new PowerUp(0, this.powerUpPointsX[randomPosition][0], this.powerUpPointsX[randomPosition][1], this.game.options.canvasContext));
      this.powerUps[0].loadContent(this.powerUpTex);
  }

  isPowerup() {
    return this.powerUps.length == 1;
  }

  getPlayerPositionX() {
    return this.player.posXOnMap;
  }

  helpTextIsReady(eventNumber: number) {
    switch (eventNumber) {
        case 1: this.playerStats.fill();
          this.nextLevel();
          break;
        case 99: this.restartLevel();
          break;
    }
  }

  checkForEvent() {}
}
