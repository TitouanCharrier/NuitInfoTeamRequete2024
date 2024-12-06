import Gametcha from "./gametcha.js";
import GameWindow from "./GameWindow.js";
let gametcha = new Gametcha((res) => { console.log(res); });
gametcha.show();
let game = new GameWindow(gametcha);
