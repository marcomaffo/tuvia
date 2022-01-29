export default class Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  intersects(rect: Rectangle) {
    return this.x < rect.x + rect.width
        && this.x + this.width > rect.x
        && this.y < rect.y + rect.height
        && this.y + this.height > rect.y;
  }
}