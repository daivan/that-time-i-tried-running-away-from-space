class Ship
{

	constructor(context)
	{
		let img_background = new Image();
		img_background.src = 'assets/images/collection.png';
		this.context=context;
		this.image=img_background;
		this.position_x = 0;
		this.position_y = 0;
		this.current_animation_frame = 2;
		this.max_animation_frame = 4;
		this.current_frame_rate = 20;
		this.max_frame_rate = 10;
	}


	moveUp()
	{
		this.position_y = this.position_y - 1
	}

	moveDown()
	{
		this.position_y = this.position_y + 1
	}

	moveLeft()
	{
		this.position_x = this.position_x - 1
	}

	moveRight()
	{
		this.position_x = this.position_x + 1
	}

	render()
	{
		let animationFrame = this.getAnimationFrame(this.current_animation_frame);
		this.context.drawImage(this.image, animationFrame[0], animationFrame[1], 64, 64, this.position_x, this.position_y, 64, 64);
		
		this.current_frame_rate-=1
		if(this.current_frame_rate==0){
			this.current_animation_frame+=1
			if(this.current_animation_frame==this.max_animation_frame){
				this.current_animation_frame=0;
			}
			this.current_frame_rate=this.max_frame_rate;
		}
		
					
	}
	getAnimationFrame(frame){
		if(frame == 0){
			return [0,0]
		}else if(frame == 1){
			return [64,0]
		}else if(frame == 2){
			return [128,0]
		}else if(frame == 3){
			return [196,0]
		}

	}

}
