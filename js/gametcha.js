export default class Gametcha {
    canvas;
    id;
    constructor(id) {
        this.canvas = document.createElement("canvas");
        this.id = id;
        this.canvas.id = this.id;
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (height <= width) {
            if (height > 720)
                height *= 0.45;
            else
                height *= 0.8;
            width = height;
        }
        else {
            if (width > 720)
                width *= 0.9;
            else
                width *= 0.95;
            height = width;
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "50%";
        this.canvas.style.left = "50%";
        this.canvas.style.transform = "translate(-50%, -50%)";
    }
    show() {
        document.body.appendChild(this.canvas);
    }
    hide() {
        document.body.removeChild(this.canvas);
    }
}
