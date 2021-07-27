import { drawPlayer, drawTilemap } from '../draw.js';
import { LoadImage } from '../util.js';
import colors from '../colors.js';
import { collisionMap, Movement } from '../collision.js';

let Player: HTMLImageElement;
let TilemapImg: HTMLImageElement;
let Tilemap: { "data": Array<number>, "width": number, "height": number };

export default async function Start(ctx: CanvasRenderingContext2D, gameStats: any, globalStats: any, deltaTime: number, keyPressed: { [key: string]: boolean }) {
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
    }
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

  gameStats.PlayerStatus = Movement(gameStats.PlayerStatus, keyPressed, deltaTime, gameStats.nextFrameAnimation==4, Tilemap.data);

  drawTilemap(Tilemap.width, Tilemap.height, Tilemap.data, TilemapImg, ctx);

  drawPlayer(gameStats.PlayerStatus.x, gameStats.PlayerStatus.y, gameStats.PlayerStatus.facing, gameStats.PlayerStatus.position, Player, ctx);

  return gameStats;
}