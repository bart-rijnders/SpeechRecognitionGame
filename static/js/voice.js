class VoiceGame {

	setup() {
		if (!('webkitSpeechRecognition' in window)) {
			alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
			// Return to main menu.
		}
	}


}
