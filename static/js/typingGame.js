const _letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const VALID_CHARACTERS = _letters.concat(_letters.map(x => x.toUpperCase()));

class TypingGame extends Game {

	constructor(canvas, words) {
		super(canvas, words);
		this.current = '';
		this.textBar = new Text(this.ctx, window.innerWidth / 2, window.innerHeight -30, '', { color: 'red' });
		document.addEventListener('keydown', this.handleKeyPress.bind(this));
	}

	// Override
	foundWord(word) {
		this.textBar.text = word;
		super.foundWord(word);
	}

	// Override
	end() {
		document.removeEventListener('keydown', this.handleKeyPress.bind(this));
		super.end();
	}

	handleKeyPress(event) {
		const key = event.key;
		if(VALID_CHARACTERS.indexOf(key) >= 0)
			this.current += key;
		else if (key === 'Enter' || key === ' ') {
			const lower = this.current.toLowerCase();
			this.current = '';
			this.foundWord(lower);
		} else if (key === 'Backspace')
			this.current = this.current.substring(0, this.current.length - 1);
		this.textBar.text = this.current;

		event.preventDefault();
		return false;
	}

	// Override
	draw() {
		super.draw();
		this.textBar.draw();
	}

}
