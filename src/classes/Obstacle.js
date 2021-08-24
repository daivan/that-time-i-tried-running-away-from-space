class Obstacle {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/spritesheet.png';
        this.current_animation_frame=1
        this.context = context;
        this.image = image;
        this.max_animation_frame = 3;
        this.current_frame_rate = 20;
		this.max_frame_rate = 10;
        this.x = 128;
        this.y = 128;
        this.start = [0, 0];
        this.xFrame = 64;
        this.yFrame = 192;
        this.name = '';
    }


    render() {


        let animationFrame = this.getAnimationFrame(this.current_animation_frame);
		this.context.drawImage(this.image, animationFrame[0], animationFrame[1], 32, 32, this.x, this.y, 32, 32);
		
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
			return [0,32]
		}else if(frame == 1){
			return [32,32]
		}else if(frame == 2){
			return [64,32]
		}else{
			return [0,32]
		}

	}

    moveBack(){
		this.x -= 64
	}

    getLocation(){
        return [this.x, this.y]
    }
}