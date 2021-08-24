class Ship
{

	constructor(context)
	{
		let img_background = new Image();
		img_background.src = 'assets/images/spritesheet.png';
		this.context=context;
		this.image=img_background;
		this.position_x = 64;
		this.position_y = 64;
		this.current_animation_frame = 1;
		this.max_animation_frame = 3;
		this.current_frame_rate = 20;
		this.max_frame_rate = 10;
		this.movable = true;
		this.current_movable_speed = 5;
		this.max_movable_speed = 5;
		this.dead = false;

	}

	resetGame(){
		this.position_x = 64;
		this.position_y = 64;
		this.dead = false;
	}
	isDead(){
		return this.dead;
	}
	moveUp()
	{
		if (this.movable){
			this.position_y = this.position_y - 64
			this.movable = false;
		}
	}

	moveDown()
	{
		if (this.movable){
			this.position_y = this.position_y + 64
			this.movable = false;
		}
	}

	moveLeft()
	{
		if (this.movable){
			this.position_x = this.position_x - 64
			this.movable = false;
		}
	}

	moveRight()
	{
		if (this.movable){
			this.position_x = this.position_x + 64
			this.movable = false;
		}
	}

	render()
	{
		let animationFrame = this.getAnimationFrame(this.current_animation_frame);
		this.context.drawImage(this.image, animationFrame[0], animationFrame[1], 32, 32, this.position_x, this.position_y, 32, 32);
		
		this.current_frame_rate-=1
		if(this.current_frame_rate==0){
			this.current_animation_frame+=1
			if(this.current_animation_frame==this.max_animation_frame){
				this.current_animation_frame=0;
			}
			this.current_frame_rate=this.max_frame_rate;
		}

		if(!this.movable){
			this.current_movable_speed-=1
			if(this.current_movable_speed<0){
				this.movable=true
				this.current_movable_speed=this.max_movable_speed
			}
		}
		
		
					
	}
	getAnimationFrame(frame){
		if(frame == 0){
			return [0,0]
		}else if(frame == 1){
			return [32,0]
		}else if(frame == 2){
			return [64,0]
		}else{
			return [0,0]
		}

	}

	getPosition(){
		return [this.position_x,this.position_y]
	}

	moveBack(){
		
		if(this.position_x <= 0){
			this.dead = true;
		}
		this.position_x = this.position_x - 64
	}

	
	vibrate(){

	}	
}
