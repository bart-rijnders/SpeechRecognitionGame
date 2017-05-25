class VoiceGame extends Game {

	constructor(canvas, words) {
		super(canvas, words);
		if (!('webkitSpeechRecognition' in window)) {
			// If not supported. In the game choice menu this should be grayed out.
			alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
		}
		this.recognition = VoiceGame.createVoiceRecognizer();
		this.recognition.onstart = () => console.log('Starting speech recognition.');
		this.recognition.onresult = this.onSpeechResult.bind(this);
		this.recognition.onerror = err => console.log(err);
		this.recognition.onend = this.onSpeechRecognitionEnded.bind(this);
	}

	// Override
	run() {
		super.run();
		this.recognition.start();
	}

	onSpeechResult(event) {
		const results = event.results;
		for (let i = event.resultIndex; i < results.length; i++) {
			for (let j = 0; j < results[i].length; j++) {
				const foundWords = results[i][j].transcript.split(' ');
				foundWords.forEach(w => {
					const word = w.toLowerCase();
					super.foundWord(word);
				});
			}
		}
	}

	onSpeechRecognitionEnded() {
		console.log('Speech recognition ended.');
		this.recognition.start();
	}

	static createVoiceRecognizer() {
		const rec = new webkitSpeechRecognition();
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 5;
		rec.lang = 'en-US';
		return rec;
	}

}
