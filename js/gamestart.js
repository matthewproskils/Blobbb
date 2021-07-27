import { LoadImage } from "./util.js";
let LogoImg;
let LoadingImg;
export async function GameStart(Ctx, time) {
    if (!LogoImg) {
        LogoImg = await LoadImage("Logo.png");
    }
    Ctx.drawImage(LogoImg, 0, 0, LogoImg.width, LogoImg.height, ((Ctx.canvas.width / 2) - LogoImg.width), ((Ctx.canvas.height - LogoImg.height) / 2), LogoImg.width * 2, LogoImg.height);
    await time;
}
export async function Loading(Ctx, time) {
    if (!LoadingImg) {
        LoadingImg = await LoadImage("Loading.png");
    }
    Ctx.clearRect(0, 0, Ctx.canvas.width, Ctx.canvas.height);
    Ctx.drawImage(LoadingImg, 0, 0, LoadingImg.width, LoadingImg.height, ((Ctx.canvas.width / 2) - LoadingImg.width), ((Ctx.canvas.height - LoadingImg.height) / 2), LoadingImg.width * 2, LoadingImg.height / 2);
    await time;
}
//# sourceMappingURL=gamestart.js.map