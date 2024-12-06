import BulletHell from "./bullet-hell.js";
import Gametcha from "./gametcha.js";
<<<<<<< HEAD
import GameWindow from "./GameWindow.js";
let gametcha = new Gametcha("aaa");
gametcha.show();
let game = new GameWindow(gametcha);
=======
let gametcha = new Gametcha((res) => { console.log(res); });
gametcha.show();
let bh = new BulletHell(gametcha);
bh.start();
>>>>>>> gametcha
