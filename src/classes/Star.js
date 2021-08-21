class Star {

    constructor(context) {

        this.uniqueNumber = Math.random()
        this.context = context;
        this.x = 800;
        this.y = Math.random()*500;
        this.radius = (this.uniqueNumber*9) + 1;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        //this.moveSpeed = 0.3;
        this.moveSpeed = this.uniqueNumber;
    }


    render() {

        this.context.fill();
        this.context.beginPath();
        this.context.fillStyle = "#ccc";
        this.context.shadowBlur = 5;
        this.context.shadowColor = "#ddd";
        this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, false);
        this.context.fill();
        this.context.closePath();
        this.context.shadowBlur = 0;
        
        this.moveBack()
    }

    moveBack(){
		this.x -= this.moveSpeed;
	}


}