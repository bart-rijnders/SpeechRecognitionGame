var textbox;

document.addEventListener('DOMContentLoaded', (event) => {
    textbox = document.getElementById('textbox');
})

if (!('webkitSpeechRecognition' in window)) {
    alert("Not supported")
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() { 
        console.log("ASSUMING THE START POSITION");
    }

    recognition.onresult = function(event) {
        console.log("Recognizing speech");
        let transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript;
        }
        textbox.innerHTML = transcript;
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
    console.log("DIX")
}