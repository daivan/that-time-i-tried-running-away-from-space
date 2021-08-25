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
		this.currentHealth = 20;
		this.maxHealth = 20;
		this.dead = false;
		this.showDamageAnimation = false;
		this.lootType = 'nothing';
		this.lootAmount = 0;
		if(Math.floor(Math.random() * 100)>85){
			this.lootType = 'oxygen';
			this.lootAmount = 10;
		}
		
    }


    render() {


        let animationFrame = this.getAnimationFrame(this.current_animation_frame);
		this.context.drawImage(this.image, animationFrame[0], animationFrame[1], 64, 64, this.x, this.y, 64, 64);
		
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
		


		if(this.showDamageAnimation == true){
			this.context.fillStyle = "#FFFF00";
			this.context.shadowColor = "#FF0000";
			this.context.beginPath();
			this.context.shadowBlur = 5;
			this.context.fillStyle = "#FFFF00";
			this.context.shadowColor = "#FF0000";
			this.context.arc(this.x+32, this.y+32, 20, 50, 100, false);
			this.context.fill();
			this.context.closePath();
			this.context.shadowBlur = 0;
			this.showDamageAnimation = false;
		}

		if(this.currentHealth!=this.maxHealth){
			this.context.fillStyle = 'rgba(255,0,0,1)';
			let currentHealth = 64/(this.maxHealth/this.currentHealth)
			this.context.fillRect(this.x,this.y+60,currentHealth,4);

			if(this.lootType == 'oxygen'){
				this.context.fillStyle = "#0000FF";
				this.context.shadowColor = "#0000FF";
				this.context.beginPath();
				this.context.shadowBlur = 5;
				this.context.fillStyle = "#0000FF";
				this.context.shadowColor = "#0000FF";
				this.context.arc(this.x+15, this.y+30, 5, 25, 50, false);
				this.context.fill();
				this.context.closePath();
				this.context.shadowBlur = 0;
				let title = "oxygen"
				this.context.fillText(title, this.x+18, this.y+42);
			}
		}



					
	}
	getAnimationFrame(frame){
		if(frame == 0){
			return [0,64]
		}else if(frame == 1){
			return [64,64]
		}else if(frame == 2){
			return [128,64]
		}else{
			return [0,64]
		}

	}

    moveBack(){
		this.x -= 64
	}

    getLocation(){
        return [this.x, this.y]
    }

	takeDamage(damage){
		this.showDamageAnimation = true;
		this.currentHealth -= damage
		if(this.currentHealth<=0){
			this.destroy()
		}
	}

	destroy(){
		this.dead = true;
	}

}