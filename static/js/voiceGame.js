class VoiceGame extends Game {

	constructor(canvas, words) {
		super(canvas, words);
		const speechRecognizer = VoiceGame.createVoiceRecognizer();
		if (!speechRecognizer) {
			alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
		}
		/*if (!('webkitSpeechRecognition' in window)) {
			// If not supported. In the game choice menu this should be grayed out.
			alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
		}*/
		//this.recognition = VoiceGame.createVoiceRecognizer();
		this.recognition = speechRecognizer;
		this.recognition.onstart = () => console.log('Starting speech recognition.');
		this.recognition.onresult = this.onSpeechResult.bind(this);
		this.recognition.onerror = err => console.log(err);
		this.recognition.onend = (e) => this.onSpeechRecognitionEnded.bind(this);

		this.textBar = new Text(this.ctx, window.innerWidth / 2, window.innerHeight -30, '', { color: 'red' });
	}

	// Override
	run() {
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

	static createVoiceRecognizer() {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition;
		if (!SpeechRecognition) return null;
		const rec = new SpeechRecognition();
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 5;
		rec.lang = 'en-US';
		return rec;
	}

}
