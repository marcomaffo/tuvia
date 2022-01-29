export type KeyboardState = {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
  enter: boolean;
  space: boolean;
  escape: boolean;
}

export default class Keyboard {
  state: KeyboardState = {
    left: false,
    up: false,
    right: false,
    down: false,
    enter: false,
    space: false,
    escape: false,
  }

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  get keysDown(): number {
    return Object.keys(this.state)
                 .reduce((acc, key) => acc + this.state[key] ? 1 : 0, 0);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        this.state.enter = true;
        break;
      case 'Escape':
        this.state.escape = true;
        break;
      case " ":
        this.state.space = true;
        break;
      case "ArrowLeft":
      case "Left":
        this.state.left = true;
        break;
      case "ArrowUp":
      case "Up":
        this.state.up = true;
        break; 
      case "ArrowRight":
      case "Right":
        this.state.right = true;
        break;
      case "ArrowDown":
      case "Down":
        this.state.down = true;
        break;
    }
  }

  handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        this.state.enter = false;
        break;
      case 'Escape':
        this.state.escape = false;
        break;
      case " ":
        this.state.space = false;
        break;
      case "ArrowLeft":
      case "Left":
        this.state.left = false;
        break;
      case "ArrowUp":
      case "Up":
        this.state.up = false;
        break; 
      case "ArrowRight":
      case "Right":
        this.state.right = false;
        break;
      case "ArrowDown":
      case "Down":
        this.state.down = false;
        break;
    }
  }
}