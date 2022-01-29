export default class Color {
  r: number;
  g: number;
  b: number;
  a?: number;

  constructor(r: number, g: number, b: number, a?: number) {
    this.r = Math.round(r);
    this.g = Math.round(g);
    this.b = Math.round(b);
    this.a = a;
  }

  toString() {
    if (this.a != null) {
      return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")";
    } else {
      return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
    }
  }
}