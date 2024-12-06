"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullet_hell_js_1 = __importDefault(require("./bullet-hell.js"));
const gametcha_js_1 = __importDefault(require("./gametcha.js"));
let gametcha = new gametcha_js_1.default("aaa");
gametcha.show();
let bh = new bullet_hell_js_1.default(gametcha);
bh.start();
