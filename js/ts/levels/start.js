import { drawPlayer, drawTilemap } from '../draw.js';
import { LoadImage } from '../util.js';
import colors from '../colors.js';
import Tilemap from '../../assets/images/start.json';
let Player;
let TilemapImg;
function Movement(PlayerStatus, keyPressed, deltaTime) {
    if (keyPressed['left'] || keyPressed['ArrowLeft']) {
        PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 1000);
        PlayerStatus.facing = 4;
    }
    else if (keyPressed['right'] || keyPressed['ArrowRight']) {
        PlayerStatus.x += PlayerStatus.speed * (deltaTime / 1000);
        PlayerStatus.facing = 3;
    }
    else if (keyPressed['up'] || keyPressed['ArrowUp']) {
        PlayerStatus.y -= PlayerStatus.speed * (deltaTime / 2000);
        PlayerStatus.facing = 1;
    }
    else if (keyPressed['down'] || keyPressed['ArrowDown']) {
        PlayerStatus.facing = 2;
        PlayerStatus.y += PlayerStatus.speed * (deltaTime / 2000);
    }
    return PlayerStatus;
}
export default async function Start(ctx, gameStats, globalStats, deltaTime, keyPressed) {
    if (gameStats === null) {
        gameStats = {
            PlayerStatus: {
                x: 1,
                y: 1,
                facing: 2,
                position: 1,
                speed: 100,
            }
        };
    }
    if (!Player) {
        Player = await LoadImage('Player.png');
    }
    if (!TilemapImg) {
        TilemapImg = await LoadImage('Tilemap.png');
    }
    ctx.fillStyle = colors[2];
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    gameStats.PlayerStatus = Movement(gameStats.PlayerStatus, keyPressed, deltaTime);
    console.log("yes");
    drawTilemap(Tilemap.width, Tilemap.height, Tilemap.data, TilemapImg, ctx);
    drawPlayer(Math.round(gameStats.PlayerStatus.x), Math.round(gameStats.PlayerStatus.y), gameStats.PlayerStatus.facing, gameStats.PlayerStatus.position, Player, ctx);
    return gameStats;
}
//# sourceMappingURL=start.js.map