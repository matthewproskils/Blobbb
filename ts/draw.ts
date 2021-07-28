import colors from './colors.js';

//Draws Player based on a given position and direction
export function drawPlayer(x: number, y: number, facing: number, position: number, sprite: HTMLImageElement, context: CanvasRenderingContext2D) {
  let TileW = context.canvas.width / 8;
  let TileH = context.canvas.height / 8;
  context.drawImage(sprite, (sprite.width / 4) * position, (sprite.height / 4) * (facing - 1), sprite.width / 4, sprite.height / 4, Math.round((x+0.1) * TileW), Math.round(y * TileH), TileW*0.8, TileH);
}

export function drawTilemap(tilemapW: number, tilemapH: number, tilemap: Array<number>, sprite: HTMLImageElement, context: CanvasRenderingContext2D) {
  let TileW = context.canvas.width / 8;
  let TileH = context.canvas.height / 8;
  for (let i = 0; i < tilemap.length; i++) {
    context.drawImage(sprite, ((tilemap[i] % 4 == 0 ? 4 : tilemap[i] % 4) - 1) * 20, Math.floor(tilemap[i] % 4 == 0 ? tilemap[i] / 4 - 1 : tilemap[i] / 4) * 20, 20, 20, (i % tilemapW) * TileW, Math.floor(i / tilemapH)* TileH, TileW, TileH);
  }
}

export function drawNPC(NPCNum: number, facing: number, x: number, y: number, sprite: HTMLImageElement, context: CanvasRenderingContext2D) {
  let TileW = context.canvas.width / 8;
  let TileH = context.canvas.height / 8;
  context.drawImage(sprite, (sprite.width / 4) * (facing - 1), 20 * (NPCNum - 1), 20, 20, Math.round(x * TileW), Math.round((y - 0.1) * TileH), TileW, TileH);
}

export function drawTextBottom(Text: string, context: CanvasRenderingContext2D, TextImg: HTMLImageElement) {
  context.drawImage(TextImg, 0, 0, TextImg.width, TextImg.height, 0, (context.canvas.height / 3) * 2, context.canvas.width, (context.canvas.height / 3));
  context.textBaseline = "hanging";
  context.fillStyle = colors[0];
  context.fillText(Text, context.canvas.width / 15, (context.canvas.height / 3) * 2 + context.canvas.height / 15);
}