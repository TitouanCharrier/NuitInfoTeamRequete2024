import BulletHell from "./bullet-hell.js";
import Gametcha from "./gametcha.js";
let gametcha = new Gametcha("aaa", (res) => { console.log(res); });
gametcha.show();
let bh = new BulletHell(gametcha);
bh.start();
