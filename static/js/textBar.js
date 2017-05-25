class TextBar {

	constructor(ctx) {
		this.y = window.innerHeight - 30;
		this.x = window.ineerWidth / 2;
		this.text = '';
		this.ctx = ctx;
	}

	draw() {
		this.ctx.font = '18px Arial';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText(this.text, this.x, this.y);
		this.ctx.font = '14px Arial';
		this.ctx.fillStyle = 'black';
	}

	update() { }
}
