class Story {

    constructor(context) {

        this.context = context;
    }


    render(level) {
		
		let title = this.getTitleByLevel(level);
		let story = this.getStoryByLevel(level);
		this.context.font = "20px Arial";
		this.context.fillStyle = "#FFF";  //<======= here
		this.context.fillText(title, 20, 270);
		this.context.fillText(story, 20, 450);
    }

	getTitleByLevel(level){
		if(level==0){
			return 'Level 1'	
		}		
		if(level==1){
			return 'First mission'	
		}
		if(level==2){
			return 'Second mission'	
		}
		if(level==3){
			return 'Third mission'	
		}
		if(level==4){
			return 'Forth mission'	
		}		
		if(level==5){
			return 'Final mission'	
		}		
		return 'You completed the game!'
	}
	getStoryByLevel(level){
		if(level==0){
			return 'Just make it back alive!'	
		}			
		if(level==1){
			return 'I should try and tackle some asteroids to get some minerals!'	
		}
		if(level==2){
			return 'Im getting the hang of this. I just need to keep doing what Im doing.'	
		}		
		if(level==3){
			return 'Everything is looking good. Space is easy!'	
		}			
		if(level==4){
			return 'Its getting tougher and tougher.'	
		}			
		if(level==5){
			return 'This is the final showdown, Its all or nothing now.'	
		}			
		return 'Thanks for playing! We had a blast creating it!'
	}

}