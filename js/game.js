import { GameStart, Loading } from "./gamestart.js";
import { TimeoutPromise } from "./util.js";
import Start from "./levels/start.js";
import InputListener from "./inputListener.js";
export default class Game {
    constructor(CanvasId) {
        this._canvas = document.getElementById(CanvasId);
        this._context = this._canvas.getContext('2d');
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._time = -1;
        this._context.imageSmoothingEnabled = false;
        this._currentRoom = Start;
        this._inputListener = new InputListener();
        this.StartGame();
    }
    async StartGame() {
        await GameStart(this._context, TimeoutPromise(2000));
        await Loading(this._context, TimeoutPromise(1000));
        this._globalStats = {};
        this._gameStats = null;
        requestAnimationFrame((t) => this.GameLoop(t));
    }
    async GameLoop(time) {
        let delta = time - this._time;
        this._time = time;
        if (delta < 150) {
            this._gameStats = await this._currentRoom(this._context, this._gameStats, this._globalStats, delta, this._inputListener.PressedKeys);
            if ("isDone" in this._gameStats) {
                this._gameStats = null;
                this._currentRoom = this._gameStats.room;
            }
        }
        requestAnimationFrame((t) => this.GameLoop(t));
    }
}
//# sourceMappingURL=game.js.map