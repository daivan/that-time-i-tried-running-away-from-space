class TextInterface {

	constructor() {
		let img_background = new Image();
		img_background.src = 'assets/images/collection.png';
		this.image=img_background;
		let intro_background = new Image();
		intro_background.src = 'assets/images/intro_background.png';
		this.intro_background = intro_background;
	}


	renderStart() {



		//cx.drawImage(this.intro_background, 0, 0, 768, 512, 0, 0, 768, 512);

		let title = "That time I tried running away from space";
		let subtitle = "";
		let story1 = "";
		let story2 = "";
		let story3 = "Avoid the asteroids!";
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

	renderDead(score){

		cx.fillStyle = 'rgba(225,225,225,0.8)';
		cx.fillRect(0,0,768,512);

		let title = "You died!";
		let subtitle1 = "Your final score was:";
		let subtitle2 = score;

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

	renderInfoPanel(score){

		let scoreText = "Score: " + score;
		cx.font = "12px Arial";
		cx.fillStyle = "#FFF";
		cx.fillText(scoreText, 530, 18);
		
	}
}