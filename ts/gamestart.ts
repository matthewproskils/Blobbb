import { LoadImage } from "./util.js";

let LogoImg: HTMLImageElement;
let LoadingImg: HTMLImageElement;

export async function GameStart(Ctx: CanvasRenderingContext2D, time: Promise<void>) {
  if (!LogoImg) {
    LogoImg = <HTMLImageElement>await LoadImage("Logo.png");
  }
  Ctx.drawImage(LogoImg, 0, 0, LogoImg.width, LogoImg.height, ((Ctx.canvas.width / 2) - LogoImg.width), ((Ctx.canvas.height - LogoImg.height) / 2), LogoImg.width * 2, LogoImg.height);
  
  await time;
}

export async function Loading(Ctx: CanvasRenderingContext2D, time: Promise<void>) {
  if (!LoadingImg) {
    LoadingImg = <HTMLImageElement>await LoadImage("Loading.png");
  }

  Ctx.clearRect(0, 0, Ctx.canvas.width, Ctx.canvas.height);
  
  Ctx.drawImage(LoadingImg, 0, 0, LoadingImg.width, LoadingImg.height, ((Ctx.canvas.width / 2) - LoadingImg.width), ((Ctx.canvas.height - LoadingImg.height) / 2), LoadingImg.width * 2, LoadingImg.height / 2);
  
  await time;
}