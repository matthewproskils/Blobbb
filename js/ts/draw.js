//Draws Player based on a given position and direction
export function drawPlayer(x, y, facing, position, sprite, context) {
    context.drawImage(sprite, (sprite.width / 3) * (position - 1), (sprite.height / 4) * (facing - 1), sprite.width / 3, sprite.height / 4, x, y, context.canvas.width / 10, context.canvas.height / 9);
}
export function drawTilemap(tilemapW, tilemapH, tilemap, sprite, context) {
    let TileW = context.canvas.width / 8;
    let TileH = context.canvas.width / 8;
    for (let i = 0; i < tilemap.length; i++) {
        context.drawImage(sprite, tilemap[i] % 4 * 20, Math.ceil(tilemap[i] / 4), 20, 20, (i % tilemapW) * TileH, Math.ceil(i / tilemapW) * TileW, TileH, TileW);
    }
}
//# sourceMappingURL=draw.js.map