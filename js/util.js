export function LoadImage(url) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = `./assets/images/${url}`;
        image.onload = () => {
            resolve(image);
        };
    });
}
export function LoadImageArray(urls) {
    return new Promise((resolve, reject) => {
        let images = new Array();
        for (let url of urls) {
            let image = new Image();
            image.src = url;
            images.push(image);
        }
        Promise.all(images).then(() => {
            resolve(images);
        });
    });
}
export function CheckCollision(Obj1, Obj2) {
    return Obj1.x + Obj1.width > Obj2.x && Obj1.x < Obj2.x + Obj2.width &&
        Obj1.y + Obj1.height > Obj2.y && Obj1.y < Obj2.y + Obj2.height;
}
export async function TimeoutPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
//# sourceMappingURL=util.js.map