class Map {

    constructor(context) {

        this.context = context;
        this.cursorLocation = 0
        this.destinationList = [
            {
                "location": 0,
                "x": 10,
                "y": 10,
                "size": 10,
                "name": "Whatever"
            },
            {
                "location": 1,
                "x": 10,
                "y": 50,
                "size": 20,
                "name": "Whatever 2"
            }

        ];
    }


    render() {
        if (state.pressedKeys.up) {
            this.cursorLocation = 0
            state.pressedKeys.up = false
        }
        if (state.pressedKeys.down) {
            this.cursorLocation = 1

            state.pressedKeys.up = false
        }
        this.destinationList.map(destination => {

            this.context.fill();
            this.context.beginPath();
            this.context.fillStyle = "#FF0000";
            this.context.shadowBlur = 0;
            if (destination.location == this.cursorLocation) {
                this.context.shadowBlur = 5;
            }

            this.context.shadowColor = "#FFF";
            this.context.arc(destination.x, destination.y, destination.size, 0, 100, false);
            this.context.fill();
            this.context.closePath();
            this.context.shadowBlur = 0;

        })


    }


}