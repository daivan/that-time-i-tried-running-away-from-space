class Fireball {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/spritesheet.png';
        this.current_animation_frame = 1
        this.context = context;
        this.image = image;
        this.max_animation_frame = 2;
        this.current_frame_rate = 20;
        this.max_frame_rate = 10;

        this.x = 800;
        this.y = Math.floor(Math.random() * 8) * 64;

        this.moveSpeed = 4;
    }


    render() {

        let animationFrame = this.getAnimationFrame(this.current_animation_frame);
        this.context.drawImage(this.image, animationFrame[0], animationFrame[1], 64, 64, this.x, this.y, 64, 64);
        
        this.moveBack()

    }

    moveBack() {
        this.x -= this.moveSpeed;
    }

 
    getAnimationFrame(frame) {
        if (frame == 0) {
            return [0, 64]
        } else if (frame == 1) {
            return [64, 64]
        } else {
            return [0, 64]
        }

    }
}