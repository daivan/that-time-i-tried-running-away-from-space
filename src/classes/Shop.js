class Shop {

    constructor(context) {

        this.context = context;
        this.cursorLocation = 0;
        this.starList = [];
    }


    render(game, ship) {

        
        this.renderText(game, ship);
    }


    renderText(game, ship) {
        if (state.pressedKeys.up) {
            if(this.cursorLocation==0){
                this.cursorLocation = 0
            }else{
                this.cursorLocation -= 1
            }
            state.pressedKeys.up = false
        }
        if (state.pressedKeys.down) {
            if(this.cursorLocation==3){
                this.cursorLocation = 3
            }else{
                this.cursorLocation += 1
            }

            state.pressedKeys.down = false
        }

        let title = "Welcome to the shop";
        let continueText = "Continue";

        let healthArray = game.getHealthArray();
        let oxygenArray = game.getOxygenArray();

        let minerals = game.getMineral();
        let damage = ship.damage
        let healthText = "Health: " + healthArray[0] + "/"+healthArray[1];
		let oxygenText = "Oxygen: " + oxygenArray[0] + "/"+oxygenArray[1];

		let mineralText = "Minerals: " + minerals;
        let attackPowerText = "Attack: " + damage;
		this.context.font = "20px Arial";
		this.context.fillStyle = "#AAFFAA";
		if (healthArray[0]<=20){
			this.context.fillStyle = "#FF0000";
		}
		this.context.fillText(healthText, 8, 40);
		// show red text if oxygen is low
		this.context.fillStyle = "#AAAAFF";
		if (oxygenArray[0]<=15){
			this.context.fillStyle = "#FF0000";
		}
		this.context.fillText(oxygenText, 8, 62);
		this.context.fillStyle = "#FFFF00";
		this.context.fillText(mineralText, 8, 84);
		this.context.fillStyle = "#FF0000";
		this.context.fillText(attackPowerText, 8, 104);

        this.context.font = "30px Arial";
        this.context.fillStyle = "#FFF";  //<======= here
        this.context.fillText(title, 20, 270);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 0) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText("Buy 25 Health - Cost 100 minerals", 20, 350);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 1) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText("Buy 25 Oxygen - Cost 100 minerals", 20, 400);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 2) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText("Buy attack power - Cost 100 minerals", 20, 450);
        this.context.shadowBlur = 0;
        if (this.cursorLocation == 3) {
            this.context.shadowBlur = 5;
        }
        this.context.fillText(continueText, 20, 500);
        
    }

}