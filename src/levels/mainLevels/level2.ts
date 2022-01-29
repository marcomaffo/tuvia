import Game, { PlayType } from "../../game";
import RunLevel from "../runLevel";
import PlayerStats from "../../playerStats";
import { KeyboardState } from "../../keyboard";

export default class Level2 extends RunLevel {
  constructor(playerStats: PlayerStats, game: Game) {
    super(playerStats, game);
    this.initialzeEverything();
  }

  level1 = [ [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 16, 17, 16, 17, 16, 17, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 29, 30, 31, 28, 0, 0, 0, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 30, 31, 30, 4, 4, 4, 5, 16, 17, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 0, 41, 42, 43, 40, 0, 0, 0, 0, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 41, 42, 43, 42, 4, 4, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 44, 6, 7, 45, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 17, 4, 5, 5, 0, 0, 0, 44, 9, 30, 8, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 16, 17, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 0, 16, 17, 17, 0, 0, 0, 0, 41, 30, 40, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 4, 5, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 26, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 4, 5, 5, 5, 0, 0, 0, 44, 6, 45, 4, 4, 0, 0, 0, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39, 4, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 0, 0, 0, 16, 17, 17, 17, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 4, 5, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 4, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 16, 17, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 16, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 0, 0, 0, 0, 0, 0, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ],
                  [ 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5 ],
                  [ 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17 ], ];

  level2 = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36, 3, 2, 3, 2, 37, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 3, 2, 3, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 37, 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 37, 0, 0, 0, 0, 36, 3, 39, 0, 0, 0, 0, 38, 2, 3, 2, 3, 2, 37, 0, 0, 0, 0, 0, 0, 36, 3, 2, 3, 2, 3 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 37, 0, 0, 0, 24, 0, 26, 14, 15, 14, 15, 27, 0, 0, 0, 0, 0, 25, 0, 0, 0, 0, 36, 3, 39, 0, 0, 0, 0, 0 ],
                  [ 15, 14, 15, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 27, 13, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 37, 0, 0, 12, 0, 13, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 13, 0, 0, 36, 3, 39, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 25, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 0, 0, 48, 27, 38, 37, 0, 0, 0, 48, 27, 0, 0, 0, 0, 25, 0, 0, 24, 0, 26, 14, 15, 14, 15, 14, 15, 14 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 49, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38, 37, 0, 0, 12, 0, 25, 0, 0, 0, 0, 12, 0, 0, 0, 0, 13, 0, 0, 12, 0, 13, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 36, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 13, 0, 0, 0, 24, 0, 0, 26, 14, 15, 14, 15, 14, 15, 27, 0, 0, 0, 25, 0, 0, 24, 26, 49, 0, 0, 0, 0, 48, 27, 0, 0, 0, 25, 0, 0, 24, 26, 49, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 24, 26, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 49, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 38, 2, 3, 39, 13, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 38, 2, 3, 39, 13, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 26, 14, 49, 0, 0, 0, 0, 0, 0, 48, 15, 27, 0, 0, 0, 0, 26, 49, 0, 0, 0, 0, 0, 0, 48, 14, 15, 14, 15, 14, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 24, 38, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 39, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 48, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 14, 15, 15, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 15, 14, 15, 14, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

  levelK = [ [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true ],
                  [ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, true, true, true, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, false, false, false, false, false, false, true, true, false, false, false, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false ],
                  [ true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false ], ];


  levelE = [ [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 13, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 0, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
                  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], ];

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
      case 2: this.currentEvent = 3;
        break;
      case 3:
        this.playerStats.isDrawn = true;
        this.playerStats.fill();
        this.currentEvent = 4;
        break;
      case 4: this.currentEvent = 5;
        break;
      case 5: this.currentEvent = 6;
        break;
      case 6: this.currentEvent = 7;
        break;
      case 7: this.currentEvent = 8;
        break;
      case 8: this.currentEvent = 9;
        break;
      case 9: this.currentEvent = 15;
        break;
      case 10:
        if (this.game.playType === PlayType.CancerSetting) {
          this.currentEvent = 17;
        }
        break;
      case 15:
        if (this.game.playType === PlayType.CancerSetting) {
          this.currentEvent = 16;
        }
        break;
      case 16: this.currentEvent = 18;
        break;
      case 12: this.currentEvent = 14;
        break;
      case 11: this.currentEvent = 19;
        break;
      case 19: this.currentEvent = 20;
        break;
      case 99: this.restartLevel();
        break;
    }
  }

  checkForEvent() {
    if (this.currentEvent !== 0) {
      if (this.game.playType === PlayType.KnightSetting) {
        switch (this.currentEvent) {
          case 1: this.showHelpText("Es scheint, als habe der böse Magier Trolle herbeigezaubert.", 1);
            break;
          case 2: this.showHelpText("Diese zerstören die Umgebung und fügen auch dir Schaden zu, wenn du sie berührst.", 2);
            break;
          case 3: this.showHelpText("Deswegen musst du sie bekämpfen und darfst sie möglichst nicht berühren!", 3);
            break;
          case 4: this.showHelpText("Wenn du sie berührst nimmst du Schaden und verlierst Energie.", 4);
            break;
          case 5: this.showHelpText("Wenn deine Energie zuneige geht, musst du das Level neu starten.", 5);
            break;
          case 6: this.showHelpText("Oben rechts siehst du die Anzeige deiner Energie und Munition.", 6);
            break;
          case 7: this.showHelpText("Pass auf, dass dir beide nicht ausgehen.", 7);
            break;
          case 8: this.showHelpText("Ich habe ich dir eine Armbrust gezaubert, damit kannst du sie abschießen.", 8);
            break;
          case 9: this.showHelpText("Drücke die Leertaste um zu schießen und die Trolle zu besiegen.", 9);
            break;
          case 15: this.showHelpText("Versuche alle Trolle zu besiegen, sonst kannst du nicht weiter.", 15);
            break;
          case 10: this.showHelpText("Vor dir siehst du einen Köcher mit Pfeilen. Dieser füllt deine Munition auf.", 10);
            break;
          case 11: this.showHelpText("Dort ist ein großer Köcher mit mehr Pfeilen. Sollten mal deine Pfeile", 11);
            break;
          case 19: this.showHelpText("ausgehen und du kannst nicht mehr alle Gegner besiegen, starte einfach das", 19);
            break;
          case 20: this.showHelpText("Level neu. Drücke dafür Esc auf deiner Tastatur und wähle \"Neu starten\".", 20);
            break;
          case 12: this.showHelpText("Die Trolle mögen Bananen und haben wohl eine Banane fallen lassen.", 12);
            break;
          case 14: this.showHelpText("Nimm diese um deine Energie wieder aufzufüllen.", 14);
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
          case 1: this.showHelpText("Das ist eine Krebszelle, die in deinem Körper entstanden ist.", 1);
            break;
          case 2: this.showHelpText("Krebszellen fügen dir Schaden zu und verdrängen andere Zellen.", 2);
            break;
          case 3: this.showHelpText("Versuche deshalb, diese nicht zu berühren und sie zu bekampfen.", 3);
            break;
          case 4: this.showHelpText("Du kannst die Zellen mit deinem Chemoblaster zerstören, denn der", 4);
            break;
          case 5: this.showHelpText("Kontakt mit Chemomitteln lässt die Krebszellen absterben.", 5);
            break;
          case 6: this.showHelpText("Wenn du die Zellen berührst und deine Energie zuneige geht", 6);
            break;
          case 7: this.showHelpText("musst du das Level neu starten.", 7);
            break;
          case 8: this.showHelpText("Oben rechts siehst du deine Energie und dein verbleibendes Chemomittel.", 8);
            break;
          case 9: this.showHelpText("Pass auf, dass dir beide nicht ausgehen.", 9);
            break;
          case 15: this.showHelpText("Drücke die Leertaste um das Chemomittel zu schießen.", 15);
            break;
          case 16: this.showHelpText("Versuche alle Krebszellen zu besiegen, das ist wichtig!.", 16);
            break;
          case 18: this.showHelpText("Ansonsten könnten diese sich ansiedeln und noch mehr Schaden anrichten.", 18);
            break;
          case 10: this.showHelpText("Dort ist Chemomittel, mit dem du deinen Vorrat auffüllen kannst. Nur wenn du", 10);
            break;
          case 11: this.showHelpText("Dort ist eine große Menge an Chemomittel. Sollte einmal dein Vorrat", 11);
            break;
          case 19: this.showHelpText("ausgehen und du kannst nicht mehr alle Gegner besiegen, starte einfach das", 19);
            break;
          case 20: this.showHelpText("Level neu. Drücke dafür Esc auf deiner Tastatur und wähle Neu starten.", 20);
            break;
          case 12: this.showHelpText("Die Banane füllt deine verlorene Energie wieder auf.", 12);
            break;
          case 14: this.showHelpText("Essen während einer Krebserkrankung ist sehr wichtig!", 14);
            break;
          case 17: this.showHelpText("es regelmäßig nimmst kannst du die Krebszellen in deinem Körper zerstören.", 17);
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
