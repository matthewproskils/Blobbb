export interface ImageObject {
  [src: string]: HTMLImageElement[];
}

export function LoadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = `./assets/images/${url}`;
    image.onload = () => {
      resolve(image);
    }
  });
}

export function LoadImageArray(urls: string[]): Promise<HTMLImageElement[]> {
  return new Promise((resolve, reject) => {
    let images = new Array<HTMLImageElement>();
    for (let url of urls) {
      let image = new Image();
      image.src = url;
      images.push(image);
    }
    Promise.all(images).then(() => {
      resolve(images);
    })
  });
}

export type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function CheckCollision(Obj1: GameObject, Obj2: GameObject) {
  return Obj1.x + Obj1.width > Obj2.x && Obj1.x < Obj2.x + Obj2.width &&
         Obj1.y + Obj1.height > Obj2.y && Obj1.y < Obj2.y + Obj2.height;
}

export async function TimeoutPromise(interval: number): Promise<void> {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve();
      }, interval);
  })
}