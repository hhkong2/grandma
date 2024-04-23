export class Keyboard {
    constructor(){
        this.monitor_state = 0;
        this.monitor_list = {
            0 : ['다음', '할머니', '모두', '첫째', '둘째', '막내', '아들', '며느리', '전희선', '전희원', '전희광', '전희나', '전희호', '전희연', '전희준', '전희진'],
            1 : ['다음', '괜찮아', '힘들어', '힘낼게', '사랑해' , '고마워', '미안해', '보고싶어', ],
        }

        this.key_state = 0;
        this.line_length = 5;

    }
    drawMonitor(ctx, enter_pushing_time, WAIT_TIME, KEY_GAP){
        let x = 500;
        let y = 400;
        let dy = 100;
        let dx = 200;
        
        let text_list = this.monitor_list[this.monitor_state];
        
        for (let j=0; j<text_list.length; j++){
            let text = text_list[j];
            let text_size = ctx.measureText(text);

            let row = Math.floor(j / this.line_length);
            let col = j % this.line_length;

            if (j == this.key_state){
                ctx.fillStyle = "yellow";
                ctx.strokeRect(x + dx * col, 5 + y + dy * row, text_size.width, -50);
                let push_time = enter_pushing_time - KEY_GAP < 0 ? 0 : enter_pushing_time - KEY_GAP; 
                ctx.fillRect(x + dx * col, 5 + y + dy * row, text_size.width *  push_time / WAIT_TIME, -50);
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
            if (word === '첫째' ||
                word === '둘째' || 
                word === '막내')
                this.monitor_state = 0;
            else if (this.monitor_state == 0) this.monitor_state = 1;
            else this.monitor_state = 0;
        } 
    
        this.key_state = 0;
        if ( word !== "다음"){
            return word;
        } else{
            return '';
        }
    }
      

}