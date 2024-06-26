import { Keyboard as key0 } from "./keyboard_yesorno.js";
import { Keyboard as key1 } from "./keyboard_yo.js";
import { Keyboard as key2} from "./keyboard_short.js";
import { Keyboard as key3} from "./keyboard_word.js";
import { Keyboard as key4} from "./keyboard_emotion.js";

const WAIT_TIME = 0.5;
const KEY_GAP = 0.4;

export class Text {
  constructor() {

    this.text = [];
    this.keyboard_list = [ new key0(), new key4(), new key2(), ]; // new key1(), new key3() ];
    this.keyboard_index = 0;
    this.keyboard = this.keyboard_list[this.keyboard_index];

    this.enter_push = 'idle';
    this.enter_pushing_time = 0;

    this.stageWidth = 0;
    this.stageHeight = 0;

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === " "){
            event.preventDefault();
            if (this.enter_push === 'idle')
                this.enter_push = 'on';
        }
        else if (event.key === "Backspace") {
            this.text.pop();
        }
        else if (event.key === 'q'){
            this.keyboard_index = Math.max(0, this.keyboard_index - 1);
            this.keyboard = this.keyboard_list[this.keyboard_index];
        }
        else if (event.key === 'w'){
            this.keyboard_index = Math.min(this.keyboard_list.length - 1, this.keyboard_index + 1);
            this.keyboard = this.keyboard_list[this.keyboard_index];
        }
        else if (event.key === 'ArrowLeft'){
            this.keyboard.pushLeft();
        }
        else if (event.key === 'ArrowRight'){
            this.keyboard.pushRight();
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === " "){
            this.enter_pushing_time = 0;
            if (this.enter_push === 'on' && this.enter_pushing_time < KEY_GAP)
                this.keyboard.pushEnter();
            this.enter_push = 'idle';
        }
    });

    document.addEventListener("pointerdown", (event) => {
        if (this.enter_push === 'idle')
            this.enter_push = 'on';
    });
    document.addEventListener("pointerup", (event) => {
        this.enter_pushing_time = 0;
        if (this.enter_push === 'on' && this.enter_pushing_time < KEY_GAP)
            this.keyboard.pushEnter();
        this.enter_push = 'idle';
    });

  }
  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.keyboard.resize(this.stageWidth, this.stageHeight);
  }

  animate(ctx) {

    if (this.enter_push === 'on'){
        this.enter_pushing_time += 0.02;
        if (this.enter_pushing_time > WAIT_TIME + KEY_GAP){
            let word = this.keyboard.pushLongEnter();
            this.enter_pushing_time = 0;
            this.enter_push = 'off';
            if (word != ''){
                this.inputWord(word);
            }

        }
    }

    ctx.font = "50px serif";
    let text = Hangul.assemble(this.text);
    ctx.fillText(text, 100, 100);
  }
  
  drawMonitor(ctx){
    this.keyboard.drawMonitor(ctx, this.enter_pushing_time, WAIT_TIME, KEY_GAP);
  }

  inputWord(word){
    this.text.push(word);
  }
  
}
