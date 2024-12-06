import BulletHell from "./bullet-hell.js";
import Gametcha from "./gametcha.js";
import GameWindow from "./GameWindow.js";

let gametcha = new Gametcha((res) => {console.log(res)});

gametcha.show();

let game: GameWindow = new GameWindow(gametcha);

let bh = new BulletHell(gametcha);

bh.start();
