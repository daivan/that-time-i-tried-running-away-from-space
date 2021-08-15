class Ship
{

	constructor(context)
	{
		let img_background = new Image();
		img_background.src = 'assets/images/collection.png';
		this.context=context;
		this.image=img_background;
		this.position_x = 0;
		this.position_y = 0;
	}


	moveUp()
	{
		this.position_y = this.position_y - 1
	}

	moveDown()
	{
		this.position_y = this.position_y + 1
	}

	moveLeft()
	{
		this.position_x = this.position_x - 1
	}

	moveRight()
	{
		this.position_x = this.position_x + 1
	}

	render()
	{

		this.context.drawImage(this.image, 0, 0, 64, 64, this.position_x, this.position_y, 64, 64);
					
	}

}
