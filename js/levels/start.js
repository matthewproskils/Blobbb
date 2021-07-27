import { drawPlayer, drawTilemap } from '../draw.js';
import { LoadImage } from '../util.js';
import colors from '../colors.js';
let Player;
let TilemapImg;
let Tilemap;
function Movement(PlayerStatus, keyPressed, deltaTime, nextFrameAnimation) {
    if (keyPressed['left'] || keyPressed['ArrowLeft']) {
        PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 1000);
        PlayerStatus.facing = 4;
    }
    else if (keyPressed['right'] || keyPressed['ArrowRight']) {
        PlayerStatus.x += PlayerStatus.speed * (deltaTime / 1000);
        PlayerStatus.facing = 3;
    }
    else if (keyPressed['up'] || keyPressed['ArrowUp']) {
        PlayerStatus.y -= PlayerStatus.speed * (deltaTime / 1000);
        PlayerStatus.facing = 1;
    }
    else if (keyPressed['down'] || keyPressed['ArrowDown']) {
        PlayerStatus.facing = 2;
        PlayerStatus.y += PlayerStatus.speed * (deltaTime / 1000);
    }
    if (nextFrameAnimation) {
        if ((keyPressed['down'] || keyPressed['ArrowDown']) || (keyPressed['up'] || keyPressed['ArrowUp']) || (keyPressed['right'] || keyPressed['ArrowRight']) || (keyPressed['left'] || keyPressed['ArrowLeft'])) {
            if (PlayerStatus.position == 3) {
                PlayerStatus.position = 1;
            }
            else {
                PlayerStatus.position++;
            }
        }
        else {
            PlayerStatus.position = 0;
        }
    }
    return PlayerStatus;
}
export default async function Start(ctx, gameStats, globalStats, deltaTime, keyPressed) {
    if (gameStats === null) {
        gameStats = {
            PlayerStatus: {
                x: 2.2,
                y: 1.2,
                facing: 2,
                position: 0,
                speed: 2,
            },
            nextFrameAnimation: 4
        };
    }
    if (!Player) {
        Player = await LoadImage('Player.png');
    }
    if (!TilemapImg) {
        TilemapImg = await LoadImage('Tilemap.png');
    }
    if (!Tilemap) {
        const response = await fetch('./assets/images/start.json');
        Tilemap = await response.json();
    }
    gameStats.nextFrameAnimation == 10 ? gameStats.nextFrameAnimation = 0 : gameStats.nextFrameAnimation++;
    ctx.fillStyle = colors[2];
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gameStats.PlayerStatus = Movement(gameStats.PlayerStatus, keyPressed, deltaTime, gameStats.nextFrameAnimation == 4);
    drawTilemap(Tilemap.width, Tilemap.height, Tilemap.data, TilemapImg, ctx);
    drawPlayer(gameStats.PlayerStatus.x, gameStats.PlayerStatus.y, gameStats.PlayerStatus.facing, gameStats.PlayerStatus.position, Player, ctx);
    return gameStats;
}
//# sourceMappingURL=start.js.map