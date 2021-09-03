class Map {

    constructor(context) {

        this.context = context;
        this.cursorLocation = 0
        this.destinationList = [
            {
                "location": 0,
                "x": 0,
                "y": 0,
                "size": 10,
                "name": "Easy galaxy"
            },
            {
                "location": 1,
                "x": 0,
                "y": 40,
                "size": 10,
                "name": "Medium galaxy"
            },            
            {
                "location": 2,
                "x": 0,
                "y": 80,
                "size": 10,
                "name": "Hard galaxy"
            }
        ];
        this.finalMission = {
            "location": 0,
            "x": 0,
            "y": 0,
            "size": 10,
            "name": "Final galaxy"
        }
    }


    render(game) {
        this.renderText(game);

        if (state.pressedKeys.up) {
            this.cursorLocation -= 1
            if (this.cursorLocation < 0) {
                this.cursorLocation = 0
            }
            state.pressedKeys.up = false
        }
        if (state.pressedKeys.down) {
            this.cursorLocation += 1
            if (this.cursorLocation > 2) {
                this.cursorLocation = 2
            }

            state.pressedKeys.down = false
        }

        if (game.currentLevel < 4) {
            this.destinationList.map(destination => {

                this.context.fill();
                this.context.beginPath();
                this.context.fillStyle = "#FF0000";
                this.context.shadowBlur = 0;
                if (destination.location == this.cursorLocation) {
                    this.context.shadowBlur = 5;
                }

                this.context.shadowColor = "#FFF";
                this.context.arc(destination.x + 30, destination.y + 300, destination.size, 0, 100, false);
                this.context.font = "15px Arial";
                this.context.fillText(destination.name, destination.x + 50, destination.y + 305);
                this.context.fill();
                this.context.closePath();
                this.context.shadowBlur = 0;


            })
        }
        else if (game.currentLevel == 4) {
            this.context.fill();
            this.context.beginPath();
            this.context.fillStyle = "#FF0000";
            this.context.shadowBlur = 5;
            this.context.shadowColor = "#FFF";
            this.context.arc(this.finalMission.x + 30, this.finalMission.y + 300, this.finalMission.size, 0, 100, false);
            this.context.font = "15px Arial";
            this.context.fillText(this.finalMission.name, this.finalMission.x + 50, this.finalMission.y + 305);
            this.context.fill();
            this.context.closePath();
            this.context.shadowBlur = 0;
        }

    }


    renderText(game) {

        let title = "Select destination";
        let subtitle = (game.currentLevel + 1) + " / 4 destinations until you reach the end";
        if (game.currentLevel == 4) {
            title = "Final destination";
            subtitle = "This will be your hardest destination yet.";
        }
        let start = "Press <Space> to play the final destination";
        this.context.font = "30px Arial";
        this.context.fillStyle = "#FFF";  //<======= here
        this.context.fillText(title, 20, 200);
        this.context.fillText(subtitle, 20, 250);
        this.context.fillText(start, 20, 450);

    }

}