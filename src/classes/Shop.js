class Shop {

    constructor(context) {

        this.context = context;
        this.cursorLocation = 0;
        this.starList = [];
    }


    render() {

        this.renderText();
    }


    renderText() {
        if (state.pressedKeys.up) {
            if(this.cursorLocation==0){
                this.cursorLocation = 0
            }else{
                this.cursorLocation -= 1
            }
            state.pressedKeys.up = false
        }
        if (state.pressedKeys.down) {
            if(this.cursorLocation==2){
                this.cursorLocation = 2
            }else{
                this.cursorLocation += 1
            }

            state.pressedKeys.down = false
        }

        let title = "Welcome to the shop";
        let continueText = "Continue";

        this.context.font = "30px Arial";
        this.context.fillStyle = "#FFF";  //<======= here
        this.context.fillText(title, 20, 270);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 0) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText("Buy Health", 20, 350);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 1) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText("Buy Oxygen", 20, 400);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 2) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText(continueText, 20, 450);
        
    }

}