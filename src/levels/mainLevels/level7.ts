import Game, { PlayType } from "../../game";
import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class Level7 extends RunLevel {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
    this.initialzeEverything();
  }

  level1 = [ [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 4, 5, 4, 5 ],
                  [ 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 0, 0, 0, 29, 30, 31, 30, 31, 30, 31, 28, 0, 0, 0, 0, 17, 16, 17 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 41, 42, 43, 42, 43, 42, 43, 40, 0, 0, 0, 0, 5, 4, 5 ],
                  [ 4, 5, 4, 5, 4, 0, 0, 0, 0, 4, 5, 0, 0, 0, 4, 5, 0, 0, 0, 0, 44, 6, 7, 6, 7, 6, 7, 45, 0, 0, 0, 0, 17, 16, 17 ],
                  [ 16, 17, 16, 17, 16, 17, 0, 0, 0, 16, 17, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 4, 5, 4, 4, 5, 0, 0, 4, 5, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 16, 17, 16, 17, 0, 0, 0, 16, 17, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 5 ],
                  [ 4, 5, 4, 5, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 16, 17 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 0, 4, 16, 17, 0, 0, 0, 0, 0, 0, 0, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 16, 17, 16, 17 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 4, 4, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 16, 17 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0 ],
                  [ 0, 0, 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 37, 0, 0, 5, 36, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 37, 4, 0, 0 ],
                  [ 0, 0, 0, 0, 48, 27, 0, 0, 26, 14, 15, 27, 0, 25, 0, 5, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 16, 0, 4 ],
                  [ 0, 0, 0, 0, 0, 48, 27, 0, 13, 0, 0, 12, 0, 13, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 4, 0, 16 ],
                  [ 0, 0, 0, 0, 0, 0, 48, 27, 25, 0, 0, 24, 26, 49, 0, 17, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 2, 2, 3 ],
                  [ 0, 0, 0, 0, 0, 0, 17, 12, 13, 0, 0, 12, 13, 0, 0, 36, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 14, 14, 15 ],
                  [ 0, 0, 0, 0, 0, 5, 36, 39, 25, 0, 0, 24, 25, 0, 0, 24, 0, 26, 14, 15, 14, 27, 0, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0, 0, 4 ],
                  [ 0, 0, 0, 0, 36, 3, 39, 26, 49, 0, 0, 12, 38, 2, 3, 39, 0, 13, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0, 0, 0, 16 ],
                  [ 0, 0, 0, 0, 24, 0, 26, 49, 0, 0, 0, 48, 15, 14, 15, 14, 14, 49, 0, 0, 0, 48, 15, 14, 15, 14, 15, 14, 15, 49, 0, 0, 0, 0, 4 ],
                  [ 2, 3, 2, 3, 39, 26, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16 ],
                  [ 14, 15, 14, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, true, true, true, false, false, false, false, true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, true, true, true, true, false, false, false, true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, false, false, true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, false, false, false, true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, true, true, false, false, false, false, false, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, true, true, true, false, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true ],
                  [ true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 3, 0, 6, 10, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  currentEvent = 1;

  update(elapsedMillis: number, keyboardState: KeyboardState) {
    this.updateLevel(elapsedMillis, keyboardState);
  }

  draw() {
    this.drawLevel();
  }

  helpTextIsReady(eventNumber: number) {
    switch (eventNumber) {
      case 1: this.currentEvent = 2;
        break;
      case 99: this.restartLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Wir sind jetzt in der Höhle des Löwen.", 1);
            break;
          case 2: this.showHelpText("Kämpfe dir deinen Weg zu dem bösen Magier frei.", 2);
            break;
          case 10: this.showHelpText("Ein fliegender Troll, der wird dich sicher verfolgen. Gib Acht!", 10);
            break;
          case 13:
            if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Trolle besiegt.", 11);
              this.currentEvent = 0;
              return;
            } else {
              this.nextLevel();
            }
            break;
        }
      } else {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Wir sind jetzt in deinem Gehirn angekommen.", 1);
            break;
          case 2: this.showHelpText("Kämpfe dich bis zu dem Tumor durch, gemeinsam werden wir den Krebs besiegen.", 2);
            break;
          case 10: this.showHelpText("Eine schwebende Krebszelle, diese wird dich sicher verfolgen. Gib Acht!", 10);
            break;
          case 13:
            if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Krebszellen zerstört.", 11);
              this.currentEvent = 0;
              return;
            } else {
                this.nextLevel();
            }
            break;
        }
      }
      this.eventsPassed.push(this.currentEvent);
      this.currentEvent = 0;

      this.lastBulletEmitted = 0;
    }
  }
}
