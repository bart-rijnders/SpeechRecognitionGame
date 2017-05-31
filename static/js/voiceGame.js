class VoiceGame extends Game {

	constructor(canvas, words) {
		super(canvas, words);
		this.recognition = this.createVoiceRecognizer();
		this.textBar = new Text(this.ctx, window.innerWidth / 2, window.innerHeight -30, '', { color: 'red' });
	}

	// Override
	run() {
		if (!this.recognition) {
			alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
			this.end();
		}

		super.run();
		this.recognition.start();
	}

	// Override
	foundWord(word) {
		this.textBar.text = word;
		super.foundWord(word);
	}

	// Override
	draw() {
		super.draw();
		this.textBar.draw();
	}

	onSpeechResult(event) {
		const results = event.results;
		for (let i = event.resultIndex; i < results.length; i++) {
			for (let j = 0; j < results[i].length; j++) {
				const foundWords = results[i][j].transcript.split(' ');
				foundWords.forEach(w => {
					const word = w.toLowerCase();
					this.foundWord(word);
				});
			}
		}
	}

	onSpeechRecognitionEnded() {
		console.log('Speech recognition ended.');
		this.recognition.start();
	}

	createVoiceRecognizer() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
		if (!SpeechRecognition) return null;
		const rec = new SpeechRecognition();
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 5;
		rec.lang = 'en-US';

		rec.onstart = () => console.log('Starting speech recognition.');
		rec.onresult = this.onSpeechResult.bind(this);
		rec.onerror = err => console.log(err);
		rec.onend = (e) => this.onSpeechRecognitionEnded.bind(this);
		return rec;
	}

}
