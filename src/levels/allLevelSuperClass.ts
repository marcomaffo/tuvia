import PlayerStats from '../playerStats';
import Game from '../game';
import { KeyboardState } from '../keyboard';

export default abstract class AllLevelSuperClass {
  playerStats: PlayerStats;
  playerCanMove = true;
  game: Game;
  constructor(playerStats: PlayerStats, game: Game) {
    this.playerStats = playerStats;
    this.game = game;
  }

  nextLevel() {
    this.game.nextLevel();
  }

  showHelpText(text: string, eventNumber: number) {
    this.game.drawHelpText(text, eventNumber);
  }
  
  abstract update(elapsedMillis: number, keyboardState: KeyboardState): void;
  abstract draw(): void;
  helpTextIsReady(eventNumber: number): void {};
}
