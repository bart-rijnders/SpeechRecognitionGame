class ScoreCounter {

	constructor(ctx) {
		this.y = 20;
		this.x = 20;
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

	update(score) {
		this.text = score;
	}

}
