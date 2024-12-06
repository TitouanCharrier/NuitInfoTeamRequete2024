export default class Gametcha {
    canvas;
    div;
    id;
    frameCount;
    isHuman;
    context;
    constructor(id) {
        this.canvas = document.createElement("canvas");
        this.id = id;
        this.canvas.id = this.id;
        this.frameCount = 0;
        this.isHuman = false;
        this.div = document.createElement("div");
        let _context = this.canvas.getContext("2d");
        if (_context === null)
            throw new Error("Canvas context is null !");
        this.context = _context;
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
        this.div.style.position = "fixed";
        this.div.style.top = "0";
        this.div.style.left = "0";
        this.div.style.bottom = "0";
        this.div.style.right = "0";
        this.div.style.background = "rgba(0, 0, 0, 0.5)";
        this.div.style.zIndex = "5000";
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "50%";
        this.canvas.style.left = "50%";
        this.canvas.style.transform = "translate(-50%, -50%)";
        this.canvas.style.zIndex = "5001";
    }
    show() {
        document.body.appendChild(this.div);
        document.body.appendChild(this.canvas);
    }
    validate(validated) {
        this.isHuman = validated;
        window.requestAnimationFrame(this.endLoop.bind(this));
    }
    hide() {
        document.body.removeChild(this.canvas);
        document.body.removeChild(this.div);
    }
    // Fading at the end
    endLoop() {
        // Fades for 1 second
        if (this.frameCount++ < 60)
            window.requestAnimationFrame(this.endLoop.bind(this));
        else {
            this.hide();
        }
        // Change the fill color according to the time elapsed
        let fillColor;
        // Fades to black if the player died, fades to white otherwise
        if (!this.isHuman) {
            fillColor = Math.floor(255 - (this.frameCount * 255 / 60)).toString(16);
        }
        else {
            fillColor = Math.floor(this.frameCount * 255 / 60).toString(16);
        }
        if (fillColor.length === 1)
            fillColor = "0" + fillColor;
        this.context.fillStyle = "#" + fillColor.repeat(3);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.isHuman) {
            this.context.textAlign = "center";
            this.context.fillStyle = "#ffffff";
            this.context.fillText("Vous n'êtes pas humain.", this.canvas.width / 2, this.canvas.height / 2);
        }
        else {
            this.context.textAlign = "center";
            this.context.fillStyle = "#000000";
            this.context.fillText("Vous êtes humain!", this.canvas.width / 2, this.canvas.height / 2);
        }
    }
}
