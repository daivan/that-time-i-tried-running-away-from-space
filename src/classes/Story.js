class Story {

    constructor(context) {

        this.context = context;
    }


    render(level) {
		
		let title = this.getTitleByLevel(level);
		let story = this.getStoryByLevel(level);
		this.context.font = "30px Arial";
		this.context.fillStyle = "#FFF";  //<======= here
		this.context.fillText(title, 20, 270);
		this.context.fillText(story, 20, 450);
    }

	getTitleByLevel(level){
		if(level==0){
			return 'Level 1'	
		}		
		if(level==1){
			return 'Level 2'	
		}
		return 'You completed the game'
	}
	getStoryByLevel(level){
		if(level==0){
			return 'Just make it back alive!'	
		}			
		if(level==1){
			return 'You are getting good at this'	
		}
		return 'You are the best of the best!'
	}

}