//Draws Player based on a given position and direction
export function drawPlayer(x, y, facing, position, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.height / 8;
    context.drawImage(sprite, (sprite.width / 4) * position, (sprite.height / 4) * (facing - 1), sprite.width / 4, sprite.height / 4, Math.round(x * TileW), Math.round(y * TileH), context.canvas.width / 10, context.canvas.height / 9);
}
export function drawTilemap(tilemapW, tilemapH, tilemap, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.height / 8;
    for (let i = 0; i < tilemap.length; i++) {
        context.drawImage(sprite, ((tilemap[i] % 4 == 0 ? 4 : tilemap[i] % 4) - 1) * 20, Math.floor(tilemap[i] % 4 == 0 ? tilemap[i] / 4 - 1 : tilemap[i] / 4) * 20, 20, 20, (i % tilemapW) * TileW, Math.floor(i / tilemapH) * TileH, TileW, TileH);
    }
}
//# sourceMappingURL=draw.js.map