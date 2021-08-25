class Background {

    constructor(context) {

        this.context = context;
        this.spawnTime = 30;
        this.starList = [];
    }


    render() {

        this.starList.map(star => star.render())

        this.spawnTime -= 1
        if(this.spawnTime==0){
            let obstacle = new Star(this.context);
            this.starList.push(obstacle)
            this.spawnTime = 30
        }
    }


}