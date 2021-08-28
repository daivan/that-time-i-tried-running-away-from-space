class FloatingText {

    constructor(ctx,position, text, textColor) {
        this.ctx = ctx;
        this.position = position;
        this.text = text;
        this.textColor = textColor;
        this.time = 30;
    }

    render () {
        this.ctx.font="10px Arial";
        this.ctx.fillStyle=this.textColor;
        this.ctx.fillText(this.text, ...this.position);
        this.position[1]--;
        this.time--;
    }
}