import colors from './colors.js';
//Draws Player based on a given position and direction
export function drawPlayer(x, y, facing, position, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.height / 8;
    context.drawImage(sprite, (sprite.width / 4) * position, (sprite.height / 4) * (facing - 1), sprite.width / 4, sprite.height / 4, Math.round((x + 0.1) * TileW), Math.round(y * TileH), TileW * 0.8, TileH);
}
export function drawTilemap(tilemapW, tilemapH, tilemap, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.height / 8;
    for (let i = 0; i < tilemap.length; i++) {
        context.drawImage(sprite, ((tilemap[i] % 4 == 0 ? 4 : tilemap[i] % 4) - 1) * 20, Math.floor(tilemap[i] % 4 == 0 ? tilemap[i] / 4 - 1 : tilemap[i] / 4) * 20, 20, 20, (i % tilemapW) * TileW, Math.floor(i / tilemapH) * TileH, TileW, TileH);
    }
}
export function drawNPC(NPCNum, facing, x, y, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.height / 8;
    context.drawImage(sprite, (sprite.width / 4) * (facing - 1), 20 * (NPCNum - 1), 20, 20, Math.round(x * TileW), Math.round((y - 0.1) * TileH), TileW, TileH);
}
export function drawTextBottom(Text, context, TextImg) {
    context.drawImage(TextImg, 0, 0, TextImg.width, TextImg.height, 0, (context.canvas.height / 3) * 2, context.canvas.width, (context.canvas.height / 3));
    context.textBaseline = "hanging";
    context.fillStyle = colors[0];
    let SplitText = Text.split(" ");
    let lines = 1;
    let CurrentText = "";
    for (let i = 0; i < SplitText.length; i++) {
        if (context.measureText(CurrentText + SplitText[i]).width > context.canvas.width - 20) {
            context.fillText(CurrentText, 10, (context.canvas.height / 3) * 2 + (15 * lines));
            lines++;
            CurrentText = SplitText[i];
        }
        else {
            CurrentText = CurrentText + " " + SplitText[i];
        }
    }
    context.fillText(CurrentText, 10, (context.canvas.height / 3) * 2 + (15 * lines));
}
//# sourceMappingURL=draw.js.map