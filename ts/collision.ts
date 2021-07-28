export interface rect {
  width: number,
  height: number,
  x: number,
  y: number,
}

export function collision(rect1: rect, rect2: rect) {
  return !(rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width || rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height);
}

export function collisionMap(map: Array<number>, character: rect, typeCollide: Array<number>) {
  for (let i = 0; i < map.length; i++) {
    if (typeCollide.includes(map[i])) {
      if (collision(character, {
        width: 1,
        height: 1,
        x: i % 8,
        y: Math.floor(i / 8),
      })) {
        return true;
      }
    }
  }
  return false;
}

export function collisionMap2(map: Array<{ x: number; y: number; width: number; height: number; type: number; position: number; }>, character: rect) {
  for (let i = 0; i < map.length; i++) {
    if (collision(character, {
      width: map[i].width - 0.2,
      height: map[i].height - 0.2,
      x: map[i].x + 0.1,
      y: map[i].y + 0.1,
    })) {
      return true;
    }
  }
  return false;
}

export function collisionMap3(map: Array<{ x: number; y: number; width: number; height: number; type: number; position: number; }>, character: rect) {
  for (let i = 0; i < map.length; i++) {
    if (collision(character, {
      width: map[i].width - 0.1,
      height: map[i].height - 0.1,
      x: map[i].x + 0.05,
      y: map[i].y + 0.2,
    })) {
      return i;
    }
  }
  return false;
}

export function Movement(PlayerStatus: any, keyPressed: { [key: string]: boolean }, deltaTime: number, nextFrameAnimation: boolean, tilemapData: Array<number>, npcData: Array<{x: number; y: number; width: number; height: number; type: number; position: number; }>) {
  let hasMoved = false;
  if (keyPressed['left'] || keyPressed['ArrowLeft']) {
    PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 800);
    PlayerStatus.facing = 4;
    if (collisionMap(tilemapData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }, [9]) || collisionMap2(npcData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 })) {
      PlayerStatus.x += PlayerStatus.speed * (deltaTime / 800);
    } else {
      hasMoved = true; 
    }
  } else if (keyPressed['right'] || keyPressed['ArrowRight']) {
    PlayerStatus.x += PlayerStatus.speed * (deltaTime / 800);
    if(collisionMap(tilemapData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }, [9]) || collisionMap2(npcData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }))  {
      PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 800);
    } else {
      PlayerStatus.facing = 3;
      hasMoved = true;
    }
  } else if (keyPressed['up'] || keyPressed['ArrowUp']) {
    PlayerStatus.y -= PlayerStatus.speed * (deltaTime / 800);
    PlayerStatus.facing = 1;
    if(collisionMap(tilemapData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }, [9]) || collisionMap2(npcData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }))  {
      PlayerStatus.y += PlayerStatus.speed * (deltaTime / 800);
    } else {
      hasMoved = true;
    }
  } else if (keyPressed['down'] || keyPressed['ArrowDown']) {
    PlayerStatus.y += PlayerStatus.speed * (deltaTime / 800);
    PlayerStatus.facing = 2;
    if (collisionMap(tilemapData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 }, [9]) || collisionMap2(npcData, { x: PlayerStatus.x+0.1, y: PlayerStatus.y, width: 0.8, height: 1 })) {
      PlayerStatus.y -= PlayerStatus.speed * (deltaTime / 800);
    } else {
      hasMoved = true;
    }
  }

  if (nextFrameAnimation) {
    if (hasMoved) {
      if (PlayerStatus.position == 3) {
        PlayerStatus.position = 1;
      } else {
        PlayerStatus.position++;
      }
    } else {
      PlayerStatus.position = 0;
    }
  }
  return PlayerStatus;
}

export function npcEncounter(player: any, npc: Array<rect>) {
  let Player = Object.assign({}, player);
  if (Player.facing == 1) {
    Player.y = Player.y - 0.5;
  } else if (Player.facing == 2) {
    Player.y = Player.y + 0.5;
  } else if (Player.facing == 3) {
    Player.x = Player.x + 0.5;
  } else if (Player.facing == 4) {
    Player.x = Player.x - 0.5;
  }
  
  for (let i = 0; i < npc.length; i++) {
    if (collision(player, npc[i])) {
      return '' + i;
    }
  }

  return false;
}