class SolarFlare {

    constructor(context) {

        this.context = context;
        this.spawnTime = 30;
        this.spawnLeft = true;
        this.spawnLeftTicker = 0;
    }


    render() {
        if(this.spawnLeft){
            let leftPosition = this.getSpawnLeftTicker();
            this.context.fillStyle = 'rgba(225,100,100,0.8)';
            this.context.fillRect(0,0,leftPosition-64,512);
            this.context.fillStyle = 'rgba(225,100,100,0.8)';
            this.context.fillRect(0,0,leftPosition,512);
            this.context.fillStyle = 'rgba(225,225,0,0.3)';
            this.context.fillRect(0,0,leftPosition-128,512);   
            this.context.fillStyle = 'rgba(225,225,0,0.6)';
            this.context.fillRect(0,0,leftPosition-192,512);   
        }
    }

    addTicker(){
        if(this.spawnLeft){
           this.spawnLeftTicker += 1;
        }
        
    }

    getSpawnLeftTicker(){
        if(this.spawnLeftTicker>5 && this.spawnLeftTicker <= 10){
            return 5*64;    
        }else if(this.spawnLeftTicker > 10 && this.spawnLeftTicker <= 15){
            return (5-(this.spawnLeftTicker-10))*64;
        }else if(this.spawnLeftTicker > 15){
            this.spawnLeft = false;
            this.spawnLeftTicker = 0;
        }else{
            return this.spawnLeftTicker*64
        }
        
    }
}