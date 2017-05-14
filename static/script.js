var textbox;
var words = ['dicks', 'dicks', 'dicks'];

document.addEventListener('DOMContentLoaded', (event) => {
    textbox = document.getElementById('textbox');
    textbox.innerHTML = words.join(' ');
})

if (!('webkitSpeechRecognition' in window)) {
    alert("Not supported")
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() { 
        console.log("Starting speech recognition");
    }

    recognition.onresult = function(event) {
        console.log("Recognizing speech");
        let transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            transcript = event.results[i][0].transcript.split(' ');
            console.log(transcript);
        }

        transcript.forEach((x) => {
            var index = words.indexOf(x.toLowerCase());
            if (index >= 0)
                words.splice(index, 1);
        });

        textbox.innerHTML = words.join(' ');
    }

    recognition.onerror = function(event) { 
        console.log(event);
    }

    recognition.onend = function() { 
        console.log("ZE END!")
    }
}

function startButton(event) {
    recognition.start();
    console.log("Start button pressed")
}