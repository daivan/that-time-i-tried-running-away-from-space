class Obstacle {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/collection.png';
        this.context = context;
        this.image = image;
        this.x = 128;
        this.y = 128;
        this.start = [0, 0];
        this.xFrame = 64;
        this.yFrame = 192;
        this.name = '';
    }


    render() {


        // background pipe
        this.context.drawImage(this.image, 0, 384, 64, 64, this.x, this.y, 64, 64);

        // Render name
		cx.font = "12px Arial";
		cx.fillStyle = "#FF0000";
		cx.fillText('Rock', this.x+5, this.y+61);
    }

    moveBack(){
		this.x -= 64
	}

    getLocation(){
        return [this.x, this.y]
    }
}