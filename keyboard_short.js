export class Keyboard {
    constructor(){
        this.monitor_state = 0;
        this.monitor_list = {
            0 : ['모음', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
            1 : ['자음', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅢ', 'ㅘ', 'ㅝ', 'ㅙ'],
        }

        this.key_state = 0;
        this.line_length = 5;

    }
    drawMonitor(ctx, enter_pushing_time, WAIT_TIME, KEY_GAP){
        let x = 500;
        let y = 400;
        let dy = 60;
        let dx = 100;
        
        let text_list = this.monitor_list[this.monitor_state];
        
        if (this.key_state == 0){
            ctx.fillStyle = "yellow";
            ctx.strokeRect(x - 40, y + 5, 100, -50);
            let push_time = enter_pushing_time - KEY_GAP < 0 ? 0 : enter_pushing_time - KEY_GAP; 
            ctx.fillRect(x - 40, y + 5, 100 *  push_time / WAIT_TIME, -50);
        }
        let text = text_list[0];
        ctx.fillStyle = "black";
        ctx.fillText(text, x - 40, y);

        for (let j=1; j<text_list.length; j++){
            let row = Math.floor(j / this.line_length);
            let col = j % this.line_length;

            let text = text_list[j];
            if (j == this.key_state){
                ctx.fillStyle = "yellow";
                ctx.strokeRect(x + dx * col, 5 + y + dy * row, 50, -50);
                let push_time = enter_pushing_time - KEY_GAP < 0 ? 0 : enter_pushing_time - KEY_GAP; 
                ctx.fillRect(x + dx * col, 5 + y + dy * row, 50 *  push_time / WAIT_TIME, -50);
            }
    
            ctx.fillStyle = "black";
            ctx.fillText(text, x + dx * col, y + dy * row);
        }
      }

    pushEnter(){
        this.key_state += 1;
        if (this.key_state >= this.monitor_list[this.monitor_state].length){
            this.key_state = 0;
        }
    }

    pushLongEnter(){
        let word = this.monitor_list[this.monitor_state][this.key_state];
    
        if (this.key_state == 0){
            if (this.monitor_state == 0) this.monitor_state = 1;
            else this.monitor_state = 0;
    
        } else{
            if (this.monitor_state == 0) this.monitor_state = 1;
            else this.monitor_state = 0;
        } 
    
        this.key_state = 0;
        if ( word.length == 1){
            return word;
        } else{
            return '';
        }
    }
      

}