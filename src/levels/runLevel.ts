import Bullet from "../bullet";
import Enemy from "../enemies/enemy";
import FloorEnemy from "../enemies/floorEnemy";
import FlyingEnemy from "../enemies/flyingEnemy";
import Stone from "../enemies/stone";
import ThrowingEnemy from "../enemies/throwingEnemy";
import WalkingEnemy from "../enemies/walkingEnemy";
import Player from "../player";
import PowerUp from "../powerUp";
import Game from "../game";
import { KeyboardState } from "../keyboard";
import PlayerStats from "../playerStats";
import Rectangle from "../rectangle";
import AllLevelSuperClass from "./allLevelSuperClass";

export default abstract class RunLevel extends AllLevelSuperClass {
  friction: number;
  playerCanShoot = true;
  player: Player;
  enemies: Enemy[];
  constructor(playerStats: PlayerStats, game: Game, friction?: number) {
    super(playerStats, game);
    this.friction = friction || 0.3
  }

  powerUps: PowerUp[];
  bullets: Bullet[] = new Array();
  stoneTexture: HTMLImageElement;

  bulletsCount = 0;
  lastBulletEmitted = 101;

  tileSet: HTMLImageElement;
  bulletTexture: HTMLImageElement;
  stoneTexure: HTMLImageElement;

  tileRects: Rectangle[];

  mapWidth: number;
  mapHeight: number;

  currentEvent = 0;
  eventsPassed: number[];

  level1: number[][];
  level2: number[][];
  levelK: boolean[][];

  /**
   * Events:
   * 0 = None
   * 1 = Start position player
   * 2 = Next level
   * 3 = Ammunition
   * 4 = Small health
   * 5 = Big health
   * 6 = Walking enemy
   * 7 = Floor enemy
   * 8 = Throwing enemy
   * 9 = Flying enemy
   * 13 = End of level
   * 10 - 100 = All custom events
   **/
  levelE: number[][];

  loadContent(tileSet, playerSheet, bulletTexture, powerup1, powerup2, powerup3, tileRects, enemyRunning, enemyFloor, enemyThrowing, stoneTexture, enemyFlying) {
    this.tileSet = tileSet;
    this.bulletTexture = bulletTexture;
    this.stoneTexture = stoneTexture;

    this.tileRects = tileRects;

    for (const powerUp of this.powerUps) {
      if (powerUp.type == 0) {
        powerUp.loadContent(powerup1);
      } else if (powerUp.type == 1) {
        powerUp.loadContent(powerup2);
      } else {
        powerUp.loadContent(powerup3);
      }
    }

    for (const enemy of this.enemies) {
      if (enemy instanceof WalkingEnemy) {
        enemy.loadContent(enemyRunning);
      } else if (enemy instanceof FloorEnemy) {
        enemy.loadContent(enemyFloor);
      } else if (enemy instanceof ThrowingEnemy) {
        enemy.loadContent(enemyThrowing);
      } else if (enemy instanceof FlyingEnemy) {
        enemy.loadContent(enemyFlying);
      }
    }

    this.player.loadContent(playerSheet);
  }

  drawTiles(map: number[][]) {
    // Determine the borders of the viewport
    let leftSide = Math.floor(this.player.posXOnMap - (this.game.options.screenWidth / 2));
    let rightSide = Math.floor(this.player.posXOnMap + (this.game.options.screenWidth / 2));
    let topSide = Math.floor(this.player.posYOnMap - (this.game.options.screenHeight / 2));
    let bottomSide = Math.floor(this.player.posYOnMap + (this.game.options.screenHeight / 2));

    // It the borders are out of the map
    if (leftSide < 0) {
      leftSide = 0;
      rightSide = this.game.options.screenWidth - 1;
    } else if (rightSide > this.mapWidth - 1) {
      leftSide = this.mapWidth - this.game.options.screenWidth;
      rightSide = this.mapWidth - 1;
    }

    if (topSide < 0) {
      topSide = 0;
      bottomSide = this.game.options.screenHeight - 1;
    } else if (bottomSide > this.mapHeight - 1) {
      topSide = this.mapHeight - this.game.options.screenHeight;
      bottomSide = this.mapHeight - 1;
    }

    // Calculate the cell positions on the map
    const firstTileX = Math.floor(leftSide / 40.0);
    const lastTileX = Math.floor(rightSide / 40.0);
    const firstTileY = Math.floor(topSide / 40.0);
    const lastTileY = Math.floor(bottomSide / 40.0);

    // For a smooth movement: Distance of the left cell to the border
    const diffX = Math.abs(leftSide % 40);
    const diffY = Math.abs(topSide % 40);

    // Render ----------------------------------------------------
    let ii = 0;
    let jj = 0;

    // Go through all screen tiles
    for (let i = firstTileY; i <= lastTileY; i++) {
      jj = 0;
      for (let j = firstTileX; j <= lastTileX; j++) {
        const tileType = map[i][j];
        // If the tile is not empty
        if (tileType != 0) {
          const t = this.tileRects[tileType];
          this.game.options.canvasContext.drawImage(this.tileSet, t.x, t.y, t.width, t.height, jj * 40 - diffX, ii * 40 - diffY, 40, 40);
        }
        jj++;
      }
      ii++;
    }
  }

  playerMovement(elapsedMillis: number, keyboardState: KeyboardState) {
    if (this.playerCanMove) {
      let playerMoveDirection = 0;
      if (keyboardState.right) {
        playerMoveDirection += 1;
      }
      if (keyboardState.left) {
        playerMoveDirection -= 1;
      }

      this.player.move(playerMoveDirection, elapsedMillis);

      if (keyboardState.up) {
        this.player.jump();
      } else if (!keyboardState.up) {
        this.player.jumpRelease = true;
      }
      if (keyboardState.space && this.playerCanShoot) {
        this.shoot();
      }
    }
  }

  shoot() {
    if (this.lastBulletEmitted > 100 && this.playerStats.canShoot()) {
      this.playerStats.shoot();
      this.bullets.push(new Bullet(this.player.posXOnMap + (this.player.playerHeight / 2), this.player.posYOnMap + (this.player.playerHeight / 2) + 5, this.player.runningDirection, this.bulletTexture, this.game.options));
      this.lastBulletEmitted = 0;
    }
  }

  updateBullets(elapsedMillis: number) {
    this.lastBulletEmitted += elapsedMillis;
    const toRemoveBullets: Bullet[] = new Array();
    for (const bullet of this.bullets) {
      bullet.update(elapsedMillis);
      // TODO: Position height statt +5 ? dazu nehmen und was sind das für werte hier alles
      const bulletTopBorder = Math.floor(bullet.position.y / 40.0);
      const bulletBottomBorder = Math.floor((bullet.position.y + 5) / 40.0);
      const bulletHorizontalBorder = Math.floor((bullet.position.x + 3.5 + (bullet.direction * 3.5)) / 40.0);
      if (this.levelK[bulletTopBorder][bulletHorizontalBorder] || this.levelK[bulletBottomBorder][bulletHorizontalBorder]) {
        toRemoveBullets.push(bullet);
        continue;
      }
      for (const enemy of this.enemies) {
        if (enemy.position.intersects(bullet.position) && enemy.isHitable()) {
          toRemoveBullets.push(bullet);
          const removeEnemy = enemy.hit(1);
          if (removeEnemy) {
            this.enemies = this.enemies.filter(enemyFromAll => enemyFromAll !== enemy);
          }
          break;
        }
      }
    }
    this.bullets = this.bullets.filter(bullet => !toRemoveBullets.some(toRemoveBullet => toRemoveBullet === bullet));
  }

  calculateBulletScreenPosition() {
    const toRemoveBullets: Bullet[] = new Array();
    for (const bullet of this.bullets) {
      bullet.posOnScreen.x = this.player.posXOnScreen + (bullet.position.x - this.player.posXOnMap);
      bullet.posOnScreen.y = this.player.posYOnScreen + (bullet.position.y - this.player.posYOnMap);
      // Remove bullets out of the visible screen
      if (bullet.posOnScreen.x < -1 * bullet.position.width || bullet.posOnScreen.x > this.game.options.screenWidth) {
        toRemoveBullets.push(bullet);
      }
    }
    this.bullets = this.bullets.filter(bullet => !toRemoveBullets.some(toRemoveBullet => toRemoveBullet === bullet));
  }

  calculatePowerupScreenPosition() {
    for (const powerUp of this.powerUps) {
      powerUp.positionOnScreen.x = this.player.posXOnScreen + (powerUp.position.x - this.player.posXOnMap);
      powerUp.positionOnScreen.y = this.player.posYOnScreen + (powerUp.position.y - this.player.posYOnMap);
    }
  }

  calculateEnemyScreenPosition() {
    for (const enemy of this.enemies) {
      enemy.positionOnScreen.x = this.player.posXOnScreen + (enemy.position.x - this.player.posXOnMap);
      enemy.positionOnScreen.y = this.player.posYOnScreen + (enemy.position.y - this.player.posYOnMap);
    }
  }

  checkForPowerupCollision() {
    for (const powerUp of this.powerUps) {
      const playerRect = new Rectangle(this.player.posXOnMap, this.player.posYOnMap, this.player.playerWidth, this.player.playerHeight);
      if (playerRect.intersects(powerUp.position)) {
        this.playerStats.useItem(powerUp);
        this.powerUps = this.powerUps.filter(powerUpFromAll => powerUpFromAll !== powerUp);
        break;
      }
    }
  }

  checkForPlayerCollision() {
    this.player.onFloor = false;
    // Check for collision with the floor
    if (this.player.horizontalSpeed > 0) {
        const topVerticalBorder = this.player.posYOnMap;
        const bottomVerticalBorder = this.player.posYOnMap + this.player.playerHeight - 1;
        const rightHorizontalBorder = this.player.posXOnMap + this.player.playerWidth - 1;
        const leftHorizontalBorder = this.player.posXOnMap;

        const rightCollisionMapX = Math.floor(rightHorizontalBorder / 40.0);
        const leftCollisionMapX = Math.floor(leftHorizontalBorder / 40.0);
        const topCollisionMapY = Math.floor(topVerticalBorder / 40.0);
        const bottomCollisionMapY = Math.floor(bottomVerticalBorder / 40.0);
        const centerCollisionMapY = Math.floor((topVerticalBorder + 30) / 40.0);

        // Check for event-collsions to the right
        if (this.levelE[centerCollisionMapY][rightCollisionMapX] !== 0) {
          if (this.eventsPassed.indexOf(this.levelE[centerCollisionMapY][rightCollisionMapX]) > -1) {
            this.levelE[centerCollisionMapY][rightCollisionMapX] = 0;
          } else {
            this.currentEvent = this.levelE[centerCollisionMapY][rightCollisionMapX];

            // Do not remove the level end when not all enemies are killed
            if (this.levelE[centerCollisionMapY][rightCollisionMapX] !== 13 || this.enemies.length == 0) {
              this.levelE[centerCollisionMapY][rightCollisionMapX] = 0;
            } else {
              this.player.horizontalSpeed = -0.5;
            }
          }
        }

        // Prevent changing the x-position if right above but not left above
        if (this.levelK[topCollisionMapY][rightCollisionMapX] && !this.levelK[topCollisionMapY][leftCollisionMapX]) {
          // Peclude collisions above a corner
          if ((40 - (topVerticalBorder % 40)) >= rightHorizontalBorder % 40 || (this.levelK[topCollisionMapY][rightCollisionMapX] && this.levelK[bottomCollisionMapY][rightCollisionMapX])) {
            this.player.posXOnMap = rightCollisionMapX * 40 - this.player.playerWidth - 1;
            this.player.horizontalSpeed = 0;
          }
        } else if (this.levelK[bottomCollisionMapY][rightCollisionMapX] && !this.levelK[bottomCollisionMapY][leftCollisionMapX]) {
          // Peclude collisions below a corner
          if ((bottomVerticalBorder % 40) >= rightHorizontalBorder % 40 || (this.levelK[topCollisionMapY][rightCollisionMapX] && this.levelK[bottomCollisionMapY][rightCollisionMapX])) {
            this.player.posXOnMap = rightCollisionMapX * 40 - this.player.playerWidth - 1;
            this.player.horizontalSpeed = 0;
          }
        } else if (this.levelK[centerCollisionMapY][rightCollisionMapX]) {
          this.player.posXOnMap = rightCollisionMapX * 40 - this.player.playerWidth - 1;
          this.player.horizontalSpeed = 0;
        }
    } else if (this.player.horizontalSpeed < 0) {
      const topVerticalBorder = this.player.posYOnMap;
      const bottomVerticalBorder = this.player.posYOnMap + this.player.playerHeight - 1;
      const rightHorizontalBorder = this.player.posXOnMap + this.player.playerWidth - 1;
      const leftHorizontalBorder = this.player.posXOnMap;

      const rightCollisionMapX = Math.floor(rightHorizontalBorder / 40.0);
      const leftCollisionMapX = Math.floor(leftHorizontalBorder / 40.0);
      const topCollisionMapY = Math.floor(topVerticalBorder / 40.0);
      const bottomCollisionMapY = Math.floor(bottomVerticalBorder / 40.0);
      const centerCollisionMapY = Math.floor((topVerticalBorder + 30) / 40.0);

      // Check for event-collsions to the left
      if (this.levelE[centerCollisionMapY][leftCollisionMapX] != 0) {
        if (this.eventsPassed.indexOf(this.levelE[centerCollisionMapY][leftCollisionMapX]) > -1) {
          this.levelE[centerCollisionMapY][leftCollisionMapX] = 0;
        } else {
          this.currentEvent = this.levelE[centerCollisionMapY][leftCollisionMapX];

          // Do not remove the level end when not all enemies are killed
          if (this.levelE[centerCollisionMapY][rightCollisionMapX] != 13 || this.enemies.length == 0) {
            this.levelE[centerCollisionMapY][leftCollisionMapX] = 0;
          } else {
            this.player.horizontalSpeed = 0.5;
          }
        }
      }
      // Top left collision
      if (this.levelK[topCollisionMapY][leftCollisionMapX] && !this.levelK[topCollisionMapY][rightCollisionMapX]) {
        // Peclude collisions above a corner
        if ((40 - (topVerticalBorder % 40)) >= (40 - (leftHorizontalBorder % 40)) || (this.levelK[topCollisionMapY][leftCollisionMapX] && this.levelK[bottomCollisionMapY][leftCollisionMapX])) {
          this.player.posXOnMap = (leftCollisionMapX + 1) * 40;
          this.player.horizontalSpeed = 0;
        }
      } else if (this.levelK[bottomCollisionMapY][leftCollisionMapX] && !this.levelK[bottomCollisionMapY][rightCollisionMapX]) {
        // Peclude collisions below a corner
        if (bottomVerticalBorder % 40 >= (40 - (leftHorizontalBorder % 40)) || (this.levelK[topCollisionMapY][leftCollisionMapX] && this.levelK[bottomCollisionMapY][leftCollisionMapX])) {
          this.player.posXOnMap = (leftCollisionMapX + 1) * 40;
          this.player.horizontalSpeed = 0;
        }
      } else if (this.levelK[centerCollisionMapY][leftCollisionMapX]) {
        this.player.posXOnMap = (leftCollisionMapX + 1) * 40;
        this.player.horizontalSpeed = 0;
      }
    }
    if (this.player.verticalSpeed < 0) {
      const topVerticalBorder = this.player.posYOnMap;
      const rightHorizontalBorder = this.player.posXOnMap + this.player.playerWidth - 1;
      const leftHorizontalBorder = this.player.posXOnMap;

      const rightCollisionMapX = Math.floor(rightHorizontalBorder / 40.0);
      const leftCollisionMapX = Math.floor(leftHorizontalBorder / 40.0);
      const topCollisionMapY = Math.floor(topVerticalBorder / 40.0);

      if (this.levelK[topCollisionMapY][leftCollisionMapX] || this.levelK[topCollisionMapY][rightCollisionMapX]) {
        this.player.posYOnMap = (topCollisionMapY + 1) * 40;
        this.player.verticalSpeed = 0;
      }
    } else if (this.player.verticalSpeed > 0) {
      const bottomVerticalBorder = this.player.posYOnMap + this.player.playerHeight;
      const rightHorizontalBorder = this.player.posXOnMap + this.player.playerWidth - 1;
      const leftHorizontalBorder = this.player.posXOnMap;

      const rightCollisionMapX = Math.floor(rightHorizontalBorder / 40.0);
      const leftCollisionMapX = Math.floor(leftHorizontalBorder / 40.0);
      const bottomCollisionMapY = Math.floor(bottomVerticalBorder / 40.0);

      if (this.levelK[bottomCollisionMapY][leftCollisionMapX] || this.levelK[bottomCollisionMapY][rightCollisionMapX]) {
        this.player.posYOnMap = (bottomCollisionMapY) * 40 - this.player.playerHeight;
        this.player.verticalSpeed = 0;
        this.player.jumped = false;
        this.player.secondJump = false;
        this.player.onFloor = true;
      }
    }
  }

  checkForEnemyCollision() {
    for (const enemy of this.enemies) {
      if (enemy.position.intersects(this.player.getPlayerRect())) {
        const playerIsDead = this.playerStats.playerHit(10);
        if (playerIsDead) {
          this.showHelpText("Du hast keine Energie mehr, du musst das Level noch einmal starten!", 99);
        }
      }
    }
  }

  drawLevel() {
    this.drawTiles(this.level1);
    if (this.playerStats.drawPlayer) {
      this.player.draw();
    }

    for (const bullet of this.bullets) {
      bullet.draw();
    }
    
    for (const powerUp of this.powerUps) {
      powerUp.draw();
    }
    
    for (const enemy of this.enemies) {
      enemy.draw();
    }

    this.drawTiles(this.level2);
  }

  initialzeEverything() {
    this.eventsPassed = new Array();

    this.mapWidth = this.level1[0].length * 40;
    this.mapHeight = this.level1.length * 40;

    this.bullets = new Array();
    this.enemies = new Array();
    this.powerUps = new Array();

    outerLoop:
    for (let i = 0; i < this.levelE.length; i++) {
      for (let j = 0; j < this.levelE[i].length; j++) {
        const currentCell = this.levelE[i][j];
        if (currentCell === 1) {
          this.player = new Player(j * 40, i * 40, this.mapWidth, this.mapHeight, this.friction, this.game.options);
          this.levelE[i][j] = 0;
          break outerLoop;
        }
      }
    }

    for (let i = 0; i < this.levelE.length; i++) {
      for (let j = 0; j < this.levelE[i].length; j++) {
        const currentCell = this.levelE[i][j];
        switch (currentCell) {
          case 6:
            this.enemies.push(new WalkingEnemy(j * 40, i * 40, this.game.options));
            this.levelE[i][j] = 0;
            break;
          case 7:
            this.enemies.push(new FloorEnemy(j * 40, i * 40, this.player, this.game.options));
            this.levelE[i][j] = 0;
            break;
          case 8:
            let lookingDirection = 1;
            // If the border is to the right
            if (this.levelK[i + 1][j + 1]) {
              lookingDirection = 0;
            }
            this.enemies.push(new ThrowingEnemy(j * 40 - 20 + (lookingDirection * 40), i * 40, lookingDirection, this, this.game.options));
            this.levelE[i][j] = 0;
            break;
          case 9:
            this.enemies.push(new FlyingEnemy(j * 40, i * 40, this.player, this.game.options));
            this.levelE[i][j] = 0;
            break;
          case 3:
          case 4:
          case 5:
            this.powerUps.push(new PowerUp(this.levelE[i][j] - 3, j * 40 + 15, i * 40 + 10, this.game.options.canvasContext));
            this.levelE[i][j] = 0;
            break;
        }
      }
    }
  }

  abstract checkForEvent(): void;

  updateLevel(elapsedMillis: number, keyboardState: KeyboardState) {
    this.checkForEvent();
    this.playerStats.updateTime(elapsedMillis);
    this.checkForEnemyCollision();
    this.playerMovement(elapsedMillis, keyboardState);
    this.updateBullets(elapsedMillis);
    this.player.update();

    for (const powerUp of this.powerUps) {
      powerUp.update();
    }

    this.updateEnemies(elapsedMillis);

    this.checkForPlayerCollision();
    this.checkForPowerupCollision();
    this.player.calculateScreenPosition();
    this.calculateBulletScreenPosition();
    this.calculatePowerupScreenPosition();
    this.calculateEnemyScreenPosition();
  }

  createStone(left: number, top: number) {
    const stone = new Stone(left, top, this.game.options);
    stone.loadContent(this.stoneTexture);
    this.enemies.push(stone);
  }

  updateEnemies(elapsedMillis: number) {
    const toRemoveStones = new Array();

    for (const enemy of this.enemies) {
      enemy.update(elapsedMillis);
      if (enemy instanceof Stone) {
        const collisionX = Math.floor(enemy.position.x / 40.0);
        const collisionY = Math.floor((enemy.position.y + enemy.position.height) / 40.0);
        if (this.levelK[collisionY][collisionX]) {
          toRemoveStones.push(enemy);
        }
      }
    }

    this.enemies = this.enemies.filter(enemy => !toRemoveStones.some(toRemoveStone => toRemoveStone === enemy));
  }

  restartLevel() {
    this.game.restartLevel();
  }
}
