class TextElement {
	constructor(text, speed, ctx, game) {
		this.x = Math.floor(Math.random() * (window.innerWidth - 100)) + 50;
		this.y = -20;
		this.text = text;
		this.speed = speed;
		this.ctx = ctx;
		this.game = game;
	}

	update() {
		if (this.y > window.innerHeight)
			this.game.end();
		else
			this.y += this.speed;
	}

	draw() {
		this.ctx.fillText(this.text, this.x, this.y);
	}

}
