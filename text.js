const WAIT_TIME = 1;
const KEY_GAP = 0.4;

export class Text {
  constructor() {

    this.text = '';
    this.monitor_state = 0;
    this.monitor_list = {
        0 : ['다음', 'ㄱ, ㄴ, ㄷ, ㄹ', 'ㅁ, ㅂ, ㅅ, ㅇ', 'ㅈ, ㅊ, ㅋ, ㅌ', 'ㅍ, ㅎ, ㅆ', 'ㄲ, ㄸ, ㅃ, ㅉ'],
        1 : ['뒤로', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
        2 : ['뒤로', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ'],
        3 : ['뒤로', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ'],
        4 : ['뒤로', 'ㅍ', 'ㅎ', 'ㅆ'],
        5 : ['뒤로', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅉ'],
        
        10 : ['다음', 'ㅏ, ㅑ, ㅓ, ㅕ', 'ㅗ, ㅛ, ㅜ, ㅠ', 'ㅡ, ㅣ, ㅐ, ㅒ', 'ㅔ, ㅖ, ㅘ, ㅢ', 'ㅙ, ㅚ, ㅟ, ㅝ, ㅞ'],
        11 : ['뒤로', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ'],
        12 : ['뒤로', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ'],
        13 : ['뒤로', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ'],
        14 : ['뒤로', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅢ'],
        15 : ['뒤로', 'ㅙ', 'ㅚ', 'ㅟ', 'ㅝ', 'ㅞ'],
    }

    this.key_state = 0;

    this.enter_push = 'idle';
    this.enter_pushing_time = 0;


    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === " "){
            if (this.enter_push === 'idle')
                this.enter_push = 'on';
        }
    });

    document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.key === " "){
            this.enter_pushing_time = 0;
            if (this.enter_push === 'on' && this.enter_pushing활_time < KEY_GAP)
                this.pushEnter();
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
            this.pushEnter();
        this.enter_push = 'idle';
    });

  }

  animate(ctx) {

    if (this.enter_push === 'on'){
        this.enter_pushing_time += 0.02;
        if (this.enter_pushing_time > WAIT_TIME + KEY_GAP){
            this.pushLongEnter();
        }
    }


    ctx.font = "48px serif";
    ctx.fillText(this.text, 100, 100);
  }
  
  drawMonitor(ctx){
    let x = 500;
    let y = 100;
    let dy = 60;

    let text_list = this.monitor_list[this.monitor_state];
    for (let j=0; j<text_list.length; j++){
        let text = text_list[j];
        if (j == this.key_state){
            ctx.fillStyle = "yellow";
            ctx.strokeRect(x, y + dy * j + 5, 300, -50);
            let push_time = this.enter_pushing_time - KEY_GAP < 0 ? 0 : this.enter_pushing_time - KEY_GAP; 
            ctx.fillRect(x, y + dy * j + 5, 300 *  push_time / WAIT_TIME, -50);
        }

        ctx.fillStyle = "black";
        ctx.fillText(text, x, y + dy * j);
    }
  }

  inputWord(word){
    this.text += word;
  }

  pushEnter(){
    this.key_state += 1;
    if (this.key_state >= this.monitor_list[this.monitor_state].length){
        this.key_state = 0;
    }
  }

  pushLongEnter(){
    let word = this.monitor_list[this.monitor_state][this.key_state];
    console.log(word);
    console.log(word.length);
    if ( word.length == 1){
        this.inputWord(word);
    }

    if (this.key_state == 0){
        if (this.monitor_state == 0) this.monitor_state = 0;
        else if (this.monitor_state < 10) this.monitor_state = 0;
        else if (this.monitor_state == 10) this.monitor_state = 0;
        else if (this.monitor_state > 10) this.monitor_state = 10;
   
    } else{
        if (this.monitor_state == 0) this.monitor_state = this.key_state;
        else if (this.monitor_state < 10) this.monitor_state = 10;
        else if (this.monitor_state == 10) this.monitor_state = 10 + this.key_state;
        else if (this.monitor_state > 10) this.monitor_state = 0;
    } 

    this.enter_pushing_time = 0;
    this.enter_push = 'off';
    this.key_state = 0;
  }

  
}
