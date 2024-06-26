export class Keyboard {
    constructor(){
        this.monitor_state = 0;
        this.monitor_list = {
            0 : ['모음', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
            1 : ['자음', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅢ', 'ㅘ', 'ㅝ', 'ㅙ'],
        }

        this.key_state = 0;
        this.line_length = 5;
        this.word_size = 120;

    }
    drawMonitor(ctx, enter_pushing_time, WAIT_TIME, KEY_GAP){
        ctx.font = "bold "+this.word_size.toString()+"px serif";
        let x = 100;
        let y = 300 + this.word_size;
        let dy = 100 + this.word_size;
        let dx = 150 + this.word_size;
        let rect_gap = 10;
        ctx.lineWidth = 5;
        
        let text_list = this.monitor_list[this.monitor_state];
        
        for (let j=0; j<text_list.length; j++){
            let text = text_list[j];
            let text_size = ctx.measureText(text);

            let row = Math.floor(j / this.line_length);
            let col = j % this.line_length;

            if (j == this.key_state){

                ctx.strokeStyle = "black";
                ctx.strokeRect(x + dx * col, rect_gap + y + dy * row, text_size.width, -this.word_size);
                let push_time = enter_pushing_time - KEY_GAP < 0 ? 0 : enter_pushing_time - KEY_GAP; 
                ctx.fillStyle = "yellow";
                ctx.fillRect(x + dx * col, rect_gap + y + dy * row, text_size.width, -this.word_size);
                ctx.fillStyle = "green";
                ctx.fillRect(x + dx * col, rect_gap + y + dy * row, text_size.width *  push_time / WAIT_TIME, -this.word_size);
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
      
    pushLeft(){
        return;
    }
    pushRight(){
        return;
    }

}