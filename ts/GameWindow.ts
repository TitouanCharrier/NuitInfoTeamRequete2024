import Player from "./Player.js";
import Entity from "./Entity.js";
import Gametcha from "./gametcha.js";
import Block from "./Block.js";
import MovementKey from "./MovementKey.js";

export default class GameWindow {
    public blocks: Block[] = [];
    public player: Player = new Player();
    private _tileHeight: number;
    private _tileWidth: number;
    public gameOn: boolean = true;
    private _window: Gametcha;
    private _context: CanvasRenderingContext2D;
    public tileSize: number = 50;
    private _movementKeys: MovementKey[];

    public constructor(gametcha: Gametcha) {
        this.blocks[0] = new Block(0, 0, 0, 0, 1, false, 0, 0);
        Block.tileSet = document.createElement("img");
        Block.tileSet.src = Block.tilePath;
    
        this._tileHeight = 50;
        this._tileWidth = 50;
        this._window = gametcha;
        let context = this._window.canvas.getContext("2d");
        
        if (context === null)
            throw new Error("Gametcha canvas context is null");
            
        this._context = context;

        this._movementKeys = []
        this._movementKeys.push(
            {code: "ArrowUp", state: false},   // Up arrow
            {code: "ArrowLeft", state: false},   // Left arrow
            {code: "ArrowDown", state: false},   // Down arrow
            {code: "ArrowRight", state: false},   // right arrow
        );
        window.addEventListener("keydown", this.keyPressAction.bind(this));
        window.addEventListener("keyup", this.keyPressAction.bind(this));

        this.game();
    }

    private keyPressAction(event: KeyboardEvent) {
        this._movementKeys.forEach((movementKey: MovementKey) => {
            if (event.code === movementKey.code) {
                movementKey.state = event.type === "keydown";
            }
        });
    }

    public game() {

        while (this.gameOn) {
            this.draw()

            
        }
    }

    private draw() {
        this._context.clearRect(0, 0, this._window.canvas.width, this._window.canvas.height);

        this.blocks.forEach( e => {
            this._context.drawImage(Block.tileSet,e.tileX, e.tileY, this.tileSize, this.tileSize, e.getPosX(), e.getPosY(), this.tileSize, this.tileSize);
        });

        this._context.drawImage(this.player.tileSet, this.player.tileX, this.player.tileY, this.tileSize, this.tileSize, this.player.getPosX(), this.player.getPosY(), this.tileSize, this.tileSize);
    }
}