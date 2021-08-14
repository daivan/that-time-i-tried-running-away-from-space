class Game {

  constructor() {
  	this.nextTile = Math.floor(Math.random() * 9) + 1;
  	//this.nextTile = 1;
  }

	makeMove(event)
	{
	    let mouseX = event.pageX;
	    let mouseY = event.pageY;

	    if(gameState.state === 'inGame' && this.clickWithinArea(mouseX, mouseY)){
            gameState.movesLeft -= 1;
            gameState.checkGameOver();
            game.changeTile(mouseX, mouseY);
            game.changeNextTile();
		}
	}
	changeNextTile(){
      this.nextTile = Math.floor(Math.random() * 9) + 1;
      /*
        if(this.nextTile===9){
            this.nextTile = 1;
        }else{
            this.nextTile+=1;
        }

       */
    }

	clickWithinArea(mouseX, mouseY)
    {
        if(mouseX > 72 && mouseY > 72 && mouseX < 456 && mouseY < 456){
            return true;
        }
        return false;
    }

	   selectedTile(mouseX, mouseY){
	    // - 8 is because of the canvas margin
        let x = (mouseX-8) / 64;
        let y = (mouseY-8) / 64;
        return [Math.floor(y), Math.floor(x)];
    }

    changeTile(mouseX, mouseY){
        let selectedTiles = this.selectedTile(mouseX, mouseY);

        gameState.map[selectedTiles[0]][selectedTiles[1]] = this.nextTile;

        gameState.checkLevelComplete();
    }

	update()
	{

		Background.renderGamePanels();

		Background.render();


		requests.map(request => request.render());

		goals.map(goal => goal.render());

		textInterface.renderInfoPanel();

	}
}