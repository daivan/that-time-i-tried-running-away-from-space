class Goal {

    constructor(context) {
        let image = new Image();
        image.src = 'assets/images/collection.png';
        this.context = context;
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.start = [0, 0];
        this.xFrame = 64;
        this.yFrame = 192;
        this.name = '';
    }


    render() {

        let croppedImage = [];
        if(this.start[0]===7){
            croppedImage = Background.calculate(20);
        }else{
            croppedImage = Background.calculate(23);
        }

        // background pipe
        this.context.drawImage(this.image, croppedImage[0], croppedImage[1], 64, 64, this.x, this.y, 64, 64);

        this.context.drawImage(this.image, this.xFrame, this.yFrame, 64, 64, this.x, this.y, 64, 64);

        // Render name
		cx.font = "12px Arial";
		cx.fillStyle = "#000";
		cx.fillText(this.name, this.x+5, this.y+61);
    }

}