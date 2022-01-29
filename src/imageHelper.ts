import { ImageLoadStatus } from "./game";

export default class ImageHelper {
  static tintImage(img: HTMLImageElement, tintColor: string): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
  
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
  
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = tintColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(img, 0, 0);
    return canvas;
  }

  static loadImages(sources: string[], imageLoadStatus?: ImageLoadStatus): Promise<HTMLImageElement[]> {
    return new Promise((resolve) => {
      const imgs: HTMLImageElement[] = new Array(sources.length);
      let imgsLoaded = 0;
      if (imageLoadStatus) {
        imageLoadStatus.loaded = 0;
        imageLoadStatus.max = sources.length;
      }
      for (let i = 0; i < sources.length; i++) {
        imgs[i] = new Image();
        imgs[i].src = sources[i];
        imgs[i].onload = function() {
          imgsLoaded++;
          if (imageLoadStatus) {
            imageLoadStatus.loaded += 1;
          }
          if (imgsLoaded === sources.length) {
            resolve(imgs);
          }
        }
      }
    });
  }
}