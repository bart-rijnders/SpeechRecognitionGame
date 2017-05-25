const _letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALID_CHARACTERS = _letters.concat(_letters.map(x => x.toUpperCase()));

class TypingGame extends Game {

	constructor(canvas, words) {
		super(canvas, words);
		this.current = '';
		this.textBar = new Text(this.ctx, window.innerWidth / 2, window.innerHeight -30, '', { color: 'red' });
		canvas.addEventListener('keydown', this.handleKeyPress.bind(this));
	}

	// Override
	foundWord(word) {
		this.textBar.text = word;
		super.foundWord(word);
	}

	handleKeyPress(event) {
		const key = event.key;
		if(VALID_CHARACTERS.indexOf(key) >= 0)
			this.current += key;
		else if (key == 'Enter') {
			const lower = this.current.toLowerCase();
			this.current = '';
			this.foundWord(lower);
		}
		this.textBar.text = this.current;
	}

	// Override
	draw() {
		super.draw();
		this.textBar.draw();
	}

}
