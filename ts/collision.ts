export interface rect {
    width: number,
    height: number,
    x: number,
    y: number,
}

export function collision(rect1: rect, rect2: rect){
    return !(rect1.x + rect1.width < rect2.x || rect1.x > rect2.x + rect2.width || rect1.y + rect1.height < rect2.y || rect1.y > rect2.y + rect2.height);
}

export function collisionMap(map: Array<number>, character: rect) {
    for (let i = 0; i < map.length; i++) {
        if (map[i] === 5) {
            if (collision(character, {
                width: 1,
                height: 1,
                x: i % 8,
                y: Math.floor(i/8),
            })) {
                return true;
            }
        }
    }
    return false;
}

export function Movement(PlayerStatus: any, keyPressed: { [key: string]: boolean }, deltaTime: number, nextFrameAnimation: boolean, tilemapData: Array<number>) {
    let hasMoved = false;
    if (keyPressed['left'] || keyPressed['ArrowLeft']) {
      PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 1000);
      if(collisionMap(tilemapData, {x: PlayerStatus.x, y: PlayerStatus.y, width: 1, height: 1})) {
        PlayerStatus.x += PlayerStatus.speed * (deltaTime / 1000);
      } else {
        PlayerStatus.facing = 4;
        hasMoved = true;
      }
    } else if (keyPressed['right'] || keyPressed['ArrowRight']) {
      PlayerStatus.x += PlayerStatus.speed * (deltaTime/1000);
      if(collisionMap(tilemapData, {x: PlayerStatus.x, y: PlayerStatus.y, width: 1, height: 1})) {
        PlayerStatus.x -= PlayerStatus.speed * (deltaTime / 1000);
      } else {
        PlayerStatus.facing = 3;
        hasMoved = true;
      }
    } else if (keyPressed['up'] || keyPressed['ArrowUp']) {
      PlayerStatus.y -= PlayerStatus.speed * (deltaTime/1000);
      if(collisionMap(tilemapData, {x: PlayerStatus.x, y: PlayerStatus.y, width: 1, height: 1})) {
        PlayerStatus.y += PlayerStatus.speed * (deltaTime / 1000);
      } else {
        PlayerStatus.facing = 1;
        hasMoved = true;
      }
    } else if (keyPressed['down'] || keyPressed['ArrowDown']) {
      PlayerStatus.y += PlayerStatus.speed * (deltaTime/1000);
      if(collisionMap(tilemapData, {x: PlayerStatus.x, y: PlayerStatus.y, width: 1, height: 1})) {
        PlayerStatus.y -= PlayerStatus.speed * (deltaTime / 1000);
      } else {
        PlayerStatus.facing = 2;
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