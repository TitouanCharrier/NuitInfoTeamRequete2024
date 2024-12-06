import BulletHell from "./bullet-hell.js";
import Gametcha from "./gametcha.js";
import GameWindow from "./GameWindow.js";
function platformer() {
    let g = new Gametcha((v) => {
        if (!v) {
            Swal.fire({
                title: "Erreur",
                text: "Le captcha n'est pas complété.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        else {
            Swal.fire({
                title: "Succès",
                text: "Le captcha est complété.",
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    });
    g.show();
    let gamewindow = new GameWindow(g);
}
function bullethell() {
    let g = new Gametcha((v) => {
        if (!v) {
            Swal.fire({
                title: "Erreur",
                text: "Le captcha n'est pas complété.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        else {
            Swal.fire({
                title: "Succès",
                text: "Le captcha est complété.",
                icon: "success",
                confirmButtonText: "OK",
            });
        }
    });
    g.show();
    let bh = new BulletHell(g);
    bh.start();
}
window.addEventListener("DOMContentLoaded", () => {
    let button1 = document.getElementById("gametcha1");
    let button2 = document.getElementById("gametcha2");
    if (button1 === null || button2 === null)
        throw new Error("No button found");
    button1.addEventListener("click", platformer);
    button2.addEventListener("click", bullethell);
});
