class Obstacle {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/spritesheetMin.png';
        this.current_animation_frame=1
        this.context = context;
        this.image = image;
        this.max_animation_frame = 2;
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
		this.randomNumber = Math.random() * 100;
		
		if(this.randomNumber>85){
			this.lootType = 'oxygen';
			this.lootAmount = 10;
		}else if(this.randomNumber>55 && this.randomNumber<85){
			this.lootType = 'mineral';
			this.lootAmount = 10;
		}
    }


    render() {


		if(this.currentHealth < this.maxHealth/2) {
            this.context.drawImage(this.image, 64, 192, 64, 64, this.x, this.y, 64, 64);
		} else {
            this.context.drawImage(this.image, 0, 192, 64, 64, this.x, this.y, 64, 64);
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

							
	}
	getAnimationFrame(frame){
		if(frame == 0){
			return [0,64]
		}else if(frame == 1){
			return [64,64]
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