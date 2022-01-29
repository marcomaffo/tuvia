import Game, { PlayType } from "../../game";
import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class Level9 extends RunLevel {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
    this.initialzeEverything();
  }

  level1 = [ [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 0, 0, 17, 16, 17, 16, 17, 16, 0, 0, 17, 16, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 5 ],
                  [ 16, 0, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17 ],
                  [ 4, 5, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 0, 0, 0, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 4, 0, 0, 0, 5 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 17, 16, 17, 16, 0, 0, 17, 16, 0, 0, 0, 0, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 0, 38, 14, 15, 39, 0, 0, 0, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 0, 0, 39, 0, 16, 17, 0, 0, 4, 5, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 0, 0, 0, 4, 4, 5, 0, 0, 0, 17, 16 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 0, 0, 0, 0, 4, 5, 4, 0, 0, 0, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 0, 0, 0, 0, 16, 17, 36, 0, 0, 0, 17 ],
                  [ 4, 5, 0, 0, 0, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 39, 0, 0, 4, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 17, 16, 17 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 5, 4, 5, 0, 0, 0, 0, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 17 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 0, 0, 0, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 17 ],
                  [ 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ],
                  [ 22, 23, 16, 17, 16, 17, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17 ],
                  [ 10, 11, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5 ],
                  [ 22, 23, 16, 17, 16, 17, 16, 17, 16, 17, 16, 0, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 10, 11, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 22, 23, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 36, 37, 0, 0, 0, 0, 0, 0, 36, 37, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 3, 39, 38, 2, 3, 2, 3, 2, 3, 39, 38, 2, 3, 2 ],
                  [ 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 26, 14, 15, 14, 15, 14, 15, 14, 15 ],
                  [ 0, 0, 12, 0, 0, 0, 0, 26, 14, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 24, 0, 0, 26, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 36, 39, 26, 14, 49, 0, 0, 0, 0, 0, 0, 36, 3, 2, 3, 2, 3, 37, 0 ],
                  [ 0, 48, 27, 13, 0, 0, 0, 0, 36, 3, 2, 3, 39, 0, 0, 0, 0, 0, 25, 0 ],
                  [ 0, 0, 12, 25, 0, 0, 36, 3, 39, 0, 0, 26, 14, 15, 27, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 24, 38, 2, 3, 39, 26, 14, 15, 14, 49, 0, 0, 48, 15, 27, 0, 25, 0 ],
                  [ 0, 0, 48, 15, 27, 0, 26, 49, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 48, 15, 49, 0, 0, 0, 0, 36, 37, 0, 0, 36, 39, 0, 25, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 26, 2, 3, 27, 26, 14, 49, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 3, 26, 49, 0, 0, 12, 13, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 26, 49, 0, 0, 0, 12, 38, 37, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 48, 27, 38, 37, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 38, 2, 37, 0, 0, 0, 12, 0, 25, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 27, 25, 0, 0, 0, 39, 26, 49, 0 ],
                  [ 0, 0, 36, 2, 37, 0, 0, 0, 0, 0, 0, 12, 38, 2, 3, 0, 26, 49, 0, 0 ],
                  [ 2, 3, 39, 0, 38, 2, 37, 0, 0, 0, 0, 48, 15, 14, 15, 27, 25, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 38, 2, 3, 37, 0, 0, 0, 0, 0, 12, 38, 2, 37, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 37, 0, 0, 0, 0, 48, 27, 0, 25, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 2, 3, 37, 0, 0, 48, 27, 13, 0 ],
                  [ 0, 26, 14, 15, 14, 15, 27, 0, 0, 0, 0, 0, 0, 38, 37, 0, 0, 12, 25, 0 ],
                  [ 14, 49, 0, 0, 0, 0, 48, 27, 0, 0, 0, 0, 0, 0, 38, 2, 3, 39, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 48, 15, 14, 27, 0, 0, 0, 0, 0, 0, 26, 49, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 27, 0, 0, 0, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 14, 15, 14, 15, 49, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, false, false, true, true, true, true, true, true, false, false, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true ],
                  [ true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, false, false, false, true ],
                  [ true, true, true, true, false, false, false, true, true, true, true, false, false, true, true, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, false, false, false, false, true, true, false, false, true, true, true ],
                  [ true, true, false, true, true, true, true, true, true, false, false, false, true, true, true, false, false, false, true, true ],
                  [ false, false, false, true, true, true, true, true, true, false, false, true, true, true, true, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, false, false, false, false, true, true, true, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, false, false, false, false, true, true, false, false, false, false, true ],
                  [ true, true, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true ],
                  [ true, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, true, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, true ],
                  [ true, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, true, true ],
                  [ false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4, 5, 5, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0 ],
                  [ 0, 1, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

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
      case 2: this.nextLevel();
        break;
      case 99: this.restartLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 2: this.showHelpText("wir wieder sicher. Sei Vorsichtig, der Magier ist sehr mächtig!", 2);
            break;
          case 13:
            if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Trolle besiegt.", 11);
              this.currentEvent = 0;
              return;
            } else {
              this.showHelpText("Hinter diesem Gang wartet der böse Magier! Wenn du ihn besiegen kannst, sind", 1);
            }
            break;
        }
      } else {
        switch (this.currentEvent) {
          case 2: this.showHelpText("ist der Krebs besiegt. Sei aber vorsichtig, der Krebs ist sehr gefährlich!", 2);
            break;
          case 13:
            if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Krebszellen zerstört.", 11);
              this.currentEvent = 0;
              return;
            } else {
                this.showHelpText("Hinter diesem Gang ist der grosse Tumor! Wenn wir ihn Zerstören", 1);
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
