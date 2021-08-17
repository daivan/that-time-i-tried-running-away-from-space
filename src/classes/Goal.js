class Goal {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/collection.png';
        this.context = context;
        this.image = image;
        this.x = 64;
        this.y = 64;
        this.start = [0, 0];
        this.xFrame = 64;
        this.yFrame = 192;
        this.name = '';
    }


    render() {


        // background pipe
        this.context.drawImage(this.image, 0, 448, 64, 64, this.x, this.y, 64, 64);

        // Render name
		cx.font = "12px Arial";
		cx.fillStyle = "#FF0000";
		cx.fillText('Goal', this.x+5, this.y+61);
    }

    moveBack(){
		this.x -= 64
	}
}