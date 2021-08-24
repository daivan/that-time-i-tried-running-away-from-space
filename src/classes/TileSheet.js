class TileSheet
{

	constructor(context)
	{
		let img_background = new Image();
		img_background.src = 'assets/images/spritesheet.png';
		this.context=context;
		this.image=img_background;
		this.map=[];
		let game_background = new Image();
		game_background.src = 'assets/images/game_background.png';
		this.game_background = game_background;
	}

	setMap(map)
	{
		this.map=map;
	}

	render()
	{
		let row=0;
		if(this.map.length>0){
			this.map.map((x)=>{
				let column=0;
				x.map((y)=>{
					let croppedImage=this.calculate(y);

					if(y!==0){
						this.context.drawImage(this.image, croppedImage[0], croppedImage[1], 64, 64, column*64, row*64, 64, 64);
					}

					column++;
				});
				row++;
			});
		}
	}


	calculate(number)
	{
		if(number===1){
			return [0,0]
		}else if(number===2){
			return [32,0]
		}else if(number===3){
			return [64,0]
		}else if(number===4){
			return [0,32]
		}else if(number===5){
			return [32,32]
		}else if(number===6){
			return [64,32]
		}else{
			return [0,0];
		}
	}

	renderGamePanels(){

		cx.drawImage(this.game_background, 0, 0, 768, 512, 0, 0, 768, 512);

	}
}
