import Game, { PlayType } from "../../game";
import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class Level4 extends RunLevel {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game, 0.05);
    this.initialzeEverything();
  }

  level1 = [ [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 0, 0, 0, 17, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 5, 4 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 17, 16 ],
                  [ 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 4, 5, 4, 5, 4 ],
                  [ 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 0, 0, 0, 0, 16, 17, 16, 17, 16 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 37, 0, 0, 0, 0, 0, 0, 36, 3, 2, 3, 2, 3, 2 ],
                  [ 0, 0, 24, 0, 0, 32, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 27, 0, 0, 0, 0, 0, 0, 26, 14, 15, 14, 15, 27, 25, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 48, 15, 27, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 27, 0, 0, 26, 14, 49, 0, 0, 0, 0, 12, 25, 0, 0, 0, 0, 36, 3, 39, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 12, 38, 2, 3, 2, 3, 2, 37, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 14, 49, 0, 0, 0, 0, 0, 0, 24, 38, 37, 0, 0, 36, 39, 0, 0, 0, 0, 0, 26, 14, 15 ],
                  [ 0, 0, 0, 0, 48, 15, 14, 15, 27, 0, 0, 38, 2, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 3, 2, 3, 39, 0, 38, 2, 3, 39, 0, 0, 0, 0, 0, 0, 13, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 16, 0, 12, 0, 0, 0, 0, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 3, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 38, 2, 37, 0, 0, 36, 3, 2, 3, 2, 3, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 2, 3, 39, 32, 14, 15, 27, 0, 0, 25, 0, 0, 24, 0, 26, 14, 15, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 49, 0, 0, 0 ],
                  [ 0, 0, 24, 0, 0, 0, 0, 0, 0, 13, 0, 0, 12, 0, 0, 38, 2, 3, 39, 0, 13, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0 ],
                  [ 0, 0, 12, 0, 26, 14, 15, 14, 15, 49, 0, 0, 48, 15, 27, 0, 0, 0, 0, 26, 49, 0, 0, 48, 27, 0, 0, 0, 0, 0, 0, 26, 14, 15, 14, 15, 27, 0, 0, 26, 49, 0, 0, 0, 0 ],
                  [ 2, 3, 39, 0, 13, 5, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 13, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0 ],
                  [ 14, 15, 14, 15, 49, 17, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 14, 15, 14, 49, 0, 0, 0, 0, 48, 15, 14, 15, 14, 15, 14, 49, 0, 0, 0, 0, 48, 15, 14, 49, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, true ],
                  [ true, true, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false, false, true, true, true, true, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, false, false, false, false, true, true, true, true, true, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true ],
                  [ true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true ],
                  [ true, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, true, true, true, true, true ],
                  [ true, false, false, false, false, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ], ];

  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 3, 0, 0, 6, 0, 0, 0, 7, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

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
    if (this.currentEvent != 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Hier im Sumpf musst du vorsichtig sein, denn es ist sehr rutschig.", 1);
            break;
          case 2: this.showHelpText("Wir kommen dem Magier immer näher. Es wird immer gefährlicher!", 2);
            break;
          case 13:
            if (this.enemies.length > 0) {
              this.showHelpText("Du hast noch nicht alle Trolle besiegt.", 13);
              this.currentEvent = 0;
              return;
            } else {
              this.nextLevel();
            }
            break;
          }
        } else {
          switch (this.currentEvent) {
            case 1: this.showHelpText("Hier im Lymphsystem musst du vorsichtig sein, denn es ist sehr rutschig.", 1);
              break;
            case 2: this.showHelpText("Wir kommen dem Tumor immer näher und es wird immer gefährlicher!", 2);
              break;
            case 13:
              if (this.enemies.length > 0) {
                this.showHelpText("Du hast noch nicht alle Krebszellen zerstört.", 13);
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
