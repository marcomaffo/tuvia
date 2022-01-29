import Game, { PlayType } from "../../game";
import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class Level5 extends RunLevel {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game, 0.05);
    this.initialzeEverything();
  }

  level1 = [ [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 4, 5, 0, 0, 1, 17, 16, 17, 4, 5, 4, 5, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 16, 17, 0, 0, 38, 0, 0, 0, 16, 17, 16, 17, 4, 5, 30, 31, 30, 31, 30, 31 ],
                  [ 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 42, 43, 42, 43, 42, 43 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 30, 31, 4, 5, 30, 31 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 16, 17 ],
                  [ 17, 4, 16, 17, 16, 17, 17, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 4, 5 ],
                  [ 4, 5, 4, 5, 4, 5, 16, 17, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 16, 17 ],
                  [ 16, 17, 16, 17, 16, 17, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 4, 5 ],
                  [ 4, 5, 4, 5, 4, 5, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 16, 17, 16, 17, 16, 17, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5 ],
                  [ 4, 5, 4, 5, 4, 5, 16, 17, 17, 0, 0, 0, 4, 5, 0, 0, 0, 0, 16, 17 ],
                  [ 16, 17, 16, 17, 16, 17, 4, 5, 4, 5, 4, 5, 16, 17, 0, 0, 0, 0, 4, 5 ],
                  [ 4, 5, 16, 17, 4, 5, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 16, 17 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17 ],
                  [ 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3 ],
                  [ 0, 0, 24, 26, 14, 15, 14, 15, 27, 0, 0, 26, 14, 15, 14, 15, 14, 15, 14, 15 ],
                  [ 0, 0, 12, 13, 0, 0, 0, 0, 48, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 24, 38, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 48, 15, 27, 3, 2, 37, 0, 0, 0, 0, 0, 0, 36, 2, 3, 2, 3, 2 ],
                  [ 0, 0, 0, 0, 12, 0, 0, 38, 2, 3, 2, 37, 0, 0, 24, 26, 14, 15, 27, 0 ],
                  [ 0, 0, 0, 0, 48, 15, 14, 27, 0, 0, 0, 25, 0, 0, 48, 49, 0, 0, 48, 15 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 48, 27, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 38, 2, 37, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 38, 2, 37, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 48, 27, 0, 0, 0, 0, 0, 38, 2, 37, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 26, 14, 15, 27, 0, 0, 25, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 49, 0, 0, 12, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 25, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 3, 39, 26, 14, 49, 0, 0 ],
                  [ 0, 0, 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 39, 0, 0, 13, 0, 0, 0, 0 ],
                  [ 2, 3, 2, 3, 39, 26, 14, 15, 14, 15, 14, 15, 14, 15, 14, 49, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 14, 15, 14, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, false, false, true, true, true, true, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, false, false, false, true, true, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 8, 0, 5, 0, 0, 0, 0, 0, 7, 0, 0, 6, 0, 4, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 4, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 7, 0, 3, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
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
      case 99: this.restartLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
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
        case 13:
          if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Krebszelle zerstört.", 11);
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
