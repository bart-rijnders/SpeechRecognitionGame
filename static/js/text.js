const DEFAULT_STYLE = {
	font: 'Arial',
	fontSize: 18,
	color: 'black'
};

class Text {

	constructor(ctx, x, y, text, style) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.text = text;
		this.style = Object.assign({}, DEFAULT_STYLE, style);
	}

	draw() {
		this.ctx.font = `${this.style.fontSize}px ${this.style.font}`;
		this.ctx.fillStyle = this.style.color;
		this.ctx.fillText(this.text, this.x, this.y);
	}
}
