export default class Gametcha {
	public canvas: HTMLCanvasElement;
    private div: HTMLDivElement;
    private frameCount: number;
    private isHuman: boolean;
    private context: CanvasRenderingContext2D;
    private intervalId: number;
    // private validationImg: HTMLImageElement;

    private callback: (res: boolean) => void;
	
	public constructor(callback: (res: boolean) => void) {
		this.callback = callback;
        this.canvas = document.createElement("canvas");
        this.frameCount = 0;
        this.isHuman = false;
        this.div = document.createElement("div");
        this.intervalId = -1;

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
        this.div.style.opacity = "0";
        this.div.style.zIndex = "5000";

        this.canvas.width = width;
        this.canvas.height = height;

        this.canvas.style.position = "absolute";
        this.canvas.style.top = "50%";
        this.canvas.style.left = "50%";
        this.canvas.style.transform = "translate(-50%, -50%)";
        this.canvas.style.zIndex = "5001";
	}
    
    private addOpacity() {
        this.div.style.opacity = (parseFloat(this.div.style.opacity) + 0.02).toString();
        console.log(this.div.style.opacity);
        if (parseFloat(this.div.style.opacity) >= 1) {
            clearInterval(this.intervalId);
            this.intervalId = -1;
        }
    }

    private removeOpacity() {
        this.div.style.opacity = (parseFloat(this.div.style.opacity) - 0.02).toString();
        console.log(this.div.style.opacity);
        if (parseFloat(this.div.style.opacity) <= 0) {
            clearInterval(this.intervalId);
            this.intervalId = -1;
            document.body.removeChild(this.div);
            this.callback(this.isHuman);
        }
    }

    public show() {
        document.body.appendChild(this.div);
        this.intervalId = window.setInterval(this.addOpacity.bind(this), 0.01);
        document.body.appendChild(this.canvas);
    }

    public validate(validated: boolean) {
        this.isHuman = validated;
        window.requestAnimationFrame(this.endLoop.bind(this));
    }

    public hide() {
        this.intervalId = window.setInterval(this.removeOpacity.bind(this), 0.01);
        document.body.removeChild(this.canvas);
    }

    // Fading at the end
    private endLoop() {
        // Fades for 1 second
        if (this.frameCount++ < 180) window.requestAnimationFrame(this.endLoop.bind(this));
        else {
            this.hide();
        }
        // Change the fill color according to the time elapsed
        let fillColor: string;
        // Fades to black if the player died, fades to white otherwise
        if (!this.isHuman) {
            fillColor = Math.floor(255 - (this.frameCount * 255 / 180)).toString(16);
        }
        else {
            fillColor = Math.floor(this.frameCount * 255 / 180).toString(16);
        }
        if (fillColor.length === 1) fillColor = "0" + fillColor;
        this.context.fillStyle = "#" + fillColor.repeat(3);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (!this.isHuman) {
            this.context.textAlign = "center";
            this.context.fillStyle = "#ffffff";
            // this.context.drawImage()
            this.context.fillText("Vous n'êtes pas humain.", this.canvas.width/2, this.canvas.height/2);
        }
        else {
            this.context.textAlign = "center";
            this.context.fillStyle = "#000000";
            this.context.fillText("Vous êtes humain!", this.canvas.width/2, this.canvas.height/2);
        }
    }
}
