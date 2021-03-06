import { drawNPC, drawPlayer, drawTextBottom, drawTilemap } from '../draw.js';
import { LoadImage } from '../util.js';
import colors from '../colors.js';
import { Movement, npcEncounter } from '../collision.js';
let Player;
let TilemapImg;
let Tilemap;
let NPCImage;
let TextImage;
export default async function Start(ctx, gameStats, globalStats, deltaTime, keyPressed) {
    if (gameStats === null) {
        gameStats = {
            PlayerStatus: {
                x: 2.1,
                y: 5.9,
                facing: 2,
                position: 0,
                speed: 2,
            },
            nextFrameAnimation: 4,
            NPCs: [
                {
                    x: 2,
                    y: 2,
                    width: 1,
                    height: 1,
                    type: 1,
                    position: 1,
                    inTalk: false,
                    text: [
                        "Hello there! I'm a friendly NPC.",
                        "I'm here to help you on your quest.",
                        "I'm not too smart though, so you might not want to talk to me.",
                        "This text was generated by copilot lol im sure it was stolen though",
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ here's how i made it",
                        "That link will be in the console"
                    ],
                    talkingNumber: 0,
                }
            ]
        };
    }
    if (!Player) {
        Player = await LoadImage('Player.png');
    }
    if (!TilemapImg) {
        TilemapImg = await LoadImage('Tilemap.png');
    }
    if (!Tilemap) {
        const response = await fetch('./assets/json/start.json');
        let TilemapRaw = await response.json();
        Tilemap = {
            data: TilemapRaw.layers[0].data,
            width: TilemapRaw.layers[0].width,
            height: TilemapRaw.layers[0].height
        };
    }
    if (!NPCImage) {
        NPCImage = await LoadImage('NPC.png');
    }
    if (!TextImage) {
        TextImage = await LoadImage('Text.png');
    }
    gameStats.nextFrameAnimation == 10 ? gameStats.nextFrameAnimation = 0 : gameStats.nextFrameAnimation++;
    ctx.fillStyle = colors[2];
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let inTalk = false;
    let TalkingNPC = 0;
    for (let i = 0; i < gameStats.NPCs.length; i++) {
        if (gameStats.NPCs[i].inTalk) {
            inTalk = true;
            TalkingNPC = i;
        }
    }
    ;
    drawTilemap(Tilemap.width, Tilemap.height, Tilemap.data, TilemapImg, ctx);
    gameStats.NPCs.forEach((npc) => {
        drawNPC(npc.type, npc.position, npc.x, npc.y, NPCImage, ctx);
    });
    drawPlayer(gameStats.PlayerStatus.x, gameStats.PlayerStatus.y, gameStats.PlayerStatus.facing, gameStats.PlayerStatus.position, Player, ctx);
    if (!inTalk) {
        if (' ' in keyPressed) {
            let NPC = npcEncounter(gameStats.PlayerStatus, gameStats.NPCs);
            console.log(NPC);
            if (NPC) {
                gameStats.NPCs[parseInt(NPC)].inTalk = true;
                gameStats.NPCs[parseInt(NPC)].position = gameStats.PlayerStatus.facing;
                delete keyPressed[' '];
            }
            else {
                gameStats.PlayerStatus = Movement(gameStats.PlayerStatus, keyPressed, deltaTime, gameStats.nextFrameAnimation == 4, Tilemap.data, gameStats.NPCs);
            }
        }
        else {
            gameStats.PlayerStatus = Movement(gameStats.PlayerStatus, keyPressed, deltaTime, gameStats.nextFrameAnimation == 4, Tilemap.data, gameStats.NPCs);
        }
    }
    else {
        drawTextBottom(gameStats.NPCs[TalkingNPC].text[gameStats.NPCs[TalkingNPC].talkingNumber], ctx, TextImage);
        if (' ' in keyPressed) {
            gameStats.NPCs[TalkingNPC].talkingNumber++;
            delete keyPressed[' '];
            if (gameStats.NPCs[TalkingNPC].text.length == gameStats.NPCs[TalkingNPC].talkingNumber) {
                gameStats.NPCs[TalkingNPC].inTalk = false;
                gameStats.NPCs[TalkingNPC].talkingNumber = 0;
            }
        }
    }
    return gameStats;
}
//# sourceMappingURL=start.js.map