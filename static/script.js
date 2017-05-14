var textbox;
var words = ['interior', 'crocodile', 'alligator', 'i', 'drive', 'a' ,'chevrolet', 'movie', 'theatre'];
var canvas;
var elements;

// Helper function for converting canvas size to high DPI
setHiDPICanvas = function(canvas, w, h) {
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1
    var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    var ratio = dpr / bsr;
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}

function gameLoop(ctx) {
    return function() {
        elements.forEach(function(x) {
            x.update();
        });
        ctx.clearRect(0,0,canvas.width, canvas.height);
        elements.forEach(function(x) { 
            x.draw(ctx);
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    //textbox = document.getElementById('textbox');
    //textbox.innerHTML = words.join(' ');
    canvas = document.getElementById("canvas");
    var w = window.innerWidth
    var h = window.innerHeight;
    setHiDPICanvas(canvas, w, h);
    var ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";
    elements = words.map((x) => new textElement(x, 1));
    console.log(elements);

    var FPS = 30;
    setInterval(function() {
        gameLoop(ctx)()
    }, 1000/FPS);
    recognition.start();
})

function textElement(text, speed) {
    this.x = Math.floor(Math.random() * (window.innerWidth - 0)) + 0;
    this.y = -20;
    this.text = text;
    this.speed = speed;

    this.draw = function(ctx) {
        ctx.fillText(text,this.x,this.y);
    }
    this.update = function() {
        this.y += this.speed;
    }
}

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
            var index = elements.findIndex((element) => {
                return element.text == x.toLowerCase();
            })

            if (index != -1)
                elements.splice(index, 1);
        });
    }

    recognition.onerror = function(event) { 
        console.log(event);
    }

    recognition.onend = function() { 
        console.log("ZE END!")
    }
}

function startButton(event) {
    
    console.log("Start button pressed")
}