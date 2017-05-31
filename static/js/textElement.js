class TextElement extends Text {
	constructor(ctx, text, speed, game) {
		const x = Math.floor(Math.random() * (window.innerWidth - 100)) + 50;
		const y = -20;
		super(ctx, x, y, text);
		this.speed = speed;
		this.game = game;
		this.outOfBoundsListeners = [];
	}

	update() {
		if (this.y > window.innerHeight)
			//this.game.end();
			this.outOfBoundsListeners.forEach(x => x());
		else
			this.y += this.speed;
	}

	outOfBounds(func) {
		this.outOfBoundsListeners.push(func);
	}
}
