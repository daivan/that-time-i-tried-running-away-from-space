class TextInterface {

	constructor(context) {
		this.context = context;
	}


	renderStart() {

		let title = "That time I tried running away from space";
		let subtitle = "";
		let story1 = "";
		let story2 = "";
		let story3 = "Try go run as far as you can!";
		let start = "Press <Space> to play";
		let credits = "Created by: Daivan Trinh & Hakan Einarsson for js13kGames.com 2021";
		cx.font = "30px Arial";
		cx.fillStyle = "#FFF";  //<======= here
		cx.fillText(title, 20, 270);
		cx.font = "20px Arial";
		cx.fillText(subtitle, 20, 320);

		cx.fillText(story1, 20, 340);
		cx.fillText(story2, 20, 365);
		cx.fillText(story3, 20, 390);
		cx.fillText(start, 20, 450);

		cx.font = "12px Arial";
		cx.fillText(credits, 20, 500);
	}
	

	renderEnd() {
		let title = "The End";

		let story1 = "Thank you for playing our game!";
		let story2 = "We love what you are doing at js13kGames.";
		let story3 = "Keep up the great work!";

		let credits = "Created by: Daivan Trinh & Hakan Einarsson for js13kGames.com 2021";
		cx.font = "50px Arial";
		cx.fillStyle = "#FFF";  //<======= here
		cx.fillText(title, 20, 270);
		cx.font = "20px Arial";

		cx.fillText(story1, 20, 340);
		cx.fillText(story2, 20, 365);
		cx.fillText(story3, 20, 390);

		cx.font = "12px Arial";
		cx.fillText(credits, 20, 500);

	}

	renderDead(level){

		cx.fillStyle = 'rgba(225,225,225,0.8)';
		cx.fillRect(0,0,768,512);

		let title = "You died!";
		let subtitle1 = "You came to the level:";
		let subtitle2 = level;

		let start = "Press <space> to play again";

		cx.font = "30px Arial";

		cx.fillStyle = "#FF0000";  //<======= here
		cx.fillText(title, 40, 105);
		cx.font = "18px Arial";
		cx.fillStyle = "#000";  //<======= here
		cx.fillText(subtitle1, 40, 145);
		cx.fillText(subtitle2, 40, 180);
		cx.fillText(start, 40, 230);

	}

	renderInfoPanel(healthArray, oxygenArray, distanceArray, minerals, attack){

		let healthText = "Health: " + healthArray[0] + "/"+healthArray[1];
		let oxygenText = "Oxygen: " + oxygenArray[0] + "/"+oxygenArray[1];
		let distanceText = "Destination: " + distanceArray[0] + "/"+distanceArray[1];
		let mineralText = "Minerals: " + minerals;
		let attackPowerText = "Attack: " + attack;
		this.context.font = "12px Arial";
		this.context.fillStyle = "#FFF";
		this.context.fillText(distanceText, 8, 18);
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
	}
}