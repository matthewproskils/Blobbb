export default class InputListener {
    constructor() {
        this.PressedKeys = {};
        window.addEventListener('keydown', e => {
            this.PressedKeys[e.key] = true;
        });
        window.addEventListener('keyup', e => {
            delete this.PressedKeys[e.key];
        });
    }
}
//# sourceMappingURL=inputListener.js.map