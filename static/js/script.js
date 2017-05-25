function setHiDPICanvas(canvas, w, h) {
   const ctx = canvas.getContext('2d');
   const dpr = window.devicePixelRatio || 1
   const bsr = ctx.webkitBackingStorePixelRatio ||
           ctx.mozBackingStorePixelRatio ||
           ctx.msBackingStorePixelRatio ||
           ctx.oBackingStorePixelRatio ||
           ctx.backingStorePixelRatio || 1;
   const ratio = dpr / bsr;
   canvas.width = w * ratio;
   canvas.height = h * ratio;
   canvas.style.width = w + "px";
   canvas.style.height = h + "px";
   canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}

function setupCanvas() {
    const canvas = document.getElementById("canvas");
    const w = window.innerWidth
    const h = window.innerHeight;
    setHiDPICanvas(canvas, w, h);
    const ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";
    ctx.textAlign="center";
    return canvas;
}

// Initialized and runs the game on document load
document.addEventListener('DOMContentLoaded', (event) => {
    if (!('webkitSpeechRecognition' in window))
        alert("Your web browser does not support voice recognition, please use an up to date version of Google Chrome");
    else {
        const canvas = setupCanvas();
        const game = new Game(canvas);
        game.run();
    }
})

const FPS = 30;
const UPDATE_INTERVAL = 1000;
const SPAWN_INTERVAL = 500;
const SPEEDUP_INTERVAL = 10;
const SPEED_INCREASE = 0.01;

class Game {

   constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.elements = [];
      this.gameSpeed = 1;
      this.lastSpawned = new Date().getTime();
      this.score = 0;
      this.textBar = new TextBar(this.ctx);
      this.scoreCounter = new ScoreCounter(this.ctx);
      this.running = true;
   }

   spawn() {
      const time = new Date().getTime();
      if (time >= this.lastSpawned + SPAWN_INTERVAL) {
         this.lastSpawned = time;
         const newWord = words[Math.floor(Math.random() * words_amount)]
         const element = new TextElement(newWord, this.gameSpeed, this.ctx, this);
         this.elements.push(element);
      }
   }

   end() {
      this.running = false;
   }

   foundWord(word) {
      if (!this.running) return;
      this.textBar.text = word;
      const index = this.elements.findIndex((e) => e.text == word);
      if (index) {
         this.elements = this.elements.slice(index, 1);
         this.score++;
      }
   }

   update() {
      if (!this.running) return;
      this.spawn();
      this.elements.forEach(x => x.update());

      if (this.score % SPEEDUP_INTERVAL == 0 && this.score > 0) {
         this.gameSpeed += SPEED_INCREASE;
      }
      this.scoreCounter.update(this.score);
   }

   draw() {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!this.running) {
         this.ctx.font = '24px Arial';
         this.fillStyle = 'red';
         this.ctx.fillText(`Game Over! You got ${this.score} points.`, window.innerWidth / 2, window.innerHeight / 2);
      } else {
         this.elements.forEach(x => x.draw());
         this.textBar.draw();
         this.scoreCounter.draw();
      }
   }

   run() {
      setInterval(() => {
           this.update();
           this.draw();
      }, UPDATE_INTERVAL / FPS);
      //voiceRecognizer.start();
   }
}

// Main game state
/*function GameState(canvas, voiceRecognizer, words) {
    this.elements = []
    var self = this;
    var FPS = 30
    var gameSpeed = 1
    var lastSpawned = new Date().getTime();
    var ctx = canvas.getContext('2d');
    var voiceRecognizer = new VoiceRecognizer(this);
    var score = 0;
    var textBar = new TextBar();
    var scoreCounter = new ScoreCounter()
    var running = true;

    var spawn = function() {
        var time = new Date().getTime();
        if (time >= lastSpawned + 500){
            lastSpawned = time
            var newWord = words[Math.floor(Math.random() * words_amount)];
            var element = new TextElement(newWord, gameSpeed, self);
            self.elements.push(element);
        }
    }

    this.endGame = function() {
        running = false;
    }

    this.foundWord = function(foundWord) {
        if (!running) return;
        textBar.text = foundWord;
        var index = this.elements.findIndex((element) => element.text == foundWord)
        if (index >= 0) {
            this.elements.splice(index, 1);
            score += 1;
            console.log(score);
        }
    }

    this.update = function() {
        if (!running) return;
        spawn();
        this.elements.forEach(function(x) {
            x.update();
        });
        if (score % 10 == 0 && score != 0) {
            gameSpeed += 0.01;
        }
        scoreCounter.update(score);
    }

    this.draw = function() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        if (!running) {
            ctx.font = "24px Arial";
            ctx.fillStyle = 'red';
            ctx.fillText("Game over! You got " + score.toString() + " point(s)", window.innerWidth / 2, window.innerHeight / 2);
            return;
        }
        this.elements.forEach(function(x) {
            x.draw(ctx);
        });
        textBar.draw(ctx);
        scoreCounter.draw(ctx);
    }

    this.run = function() {
        var self = this;
        setInterval(function() {
            self.update();
            self.draw();
        }, 1000/FPS);
        voiceRecognizer.start();
    }
}

// Helper function for converting canvas size to high DPI
 function setHiDPICanvas(canvas, w, h) {
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

// Gets the plain canvas element and sets up default properties
function setupCanvas() {
    var canvas = document.getElementById("canvas");
    var w = window.innerWidth
    var h = window.innerHeight;
    setHiDPICanvas(canvas, w, h);
    var ctx = canvas.getContext("2d");
    ctx.font = "14px Arial";
    ctx.textAlign="center";
    return canvas;
}

function TextBar() {
    this.y = window.innerHeight - 30;
    this.x = window.innerWidth / 2
    this.text = ''

    this.draw = function(ctx) {
        ctx.font = "18px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText(this.text,this.x,this.y);
        ctx.font = "14px Arial";
        ctx.fillStyle = 'black';
    }

    this.update = function() {

    }
}

function ScoreCounter(gameState) {
    this.y = 20;
    this.x = 20;
    this.text = ''

    this.draw = function(ctx) {
        ctx.font = "18px Arial";
        ctx.fillStyle = 'red';
        ctx.fillText(this.text,this.x,this.y);
        ctx.font = "14px Arial";
        ctx.fillStyle = 'black';
    }

    this.update = function(score) {
        this.text = score;
    }
}

// Text element that falls down during the game
function TextElement(text, speed, gameState) {
    this.x = Math.floor(Math.random() * (window.innerWidth - 100)) + 50;
    this.y = -20;
    this.text = text;
    this.speed = speed;

    this.draw = function(ctx) {
        ctx.fillText(text,this.x,this.y);
    }

    this.update = function() {
        if (this.y > window.innerHeight) {
            gameState.endGame();
        }
        this.y += this.speed;
    }
}

function VoiceRecognizer(gameState) {
    recognition = new webkitSpeechRecognition();
    this.recognition = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 5;
    recognition.lang = 'en-US'

    recognition.onstart = function() {
        console.log("Starting speech recognition");
    }

    recognition.onresult = function(event) {
        console.log(event.results)
        var words = []
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            for (var j = 0; j < event.results[i].length; j++) {
                event.results[i][j].transcript.split(' ').forEach(function(word) {
                    word = word.toLowerCase();
                    gameState.foundWord(word);
                });
            }
        }
    }

    recognition.onerror = function(event) {
        console.log(event);
    }

    recognition.onend = function() {
        console.log("Stopped speech recognition!")
    }

    this.start = function() {recognition.start()};
}
*/

var words = ["that", "this", "with", "from", "your", "have", "more", "will", "home", "about", "page", "search", "free", "other", "information", "time", "they", "site", "what", "which", "their", "news", "there", "only", "when", "contact", "here", "business", "also", "help", "view", "online", "first", "been", "would", "were", "services", "some", "these", "click", "like", "service", "than", "find", "price", "date", "back", "people", "list", "name", "just", "over", "state", "year", "into", "email", "health", "world", "next", "used", "work", "last", "most", "products", "music", "data", "make", "them", "should", "product", "system", "post", "city", "policy", "number", "such", "please", "available", "copyright", "support", "message", "after", "best", "software", "then", "good", "video", "well", "where", "info", "rights", "public", "books", "high", "school", "through", "each", "links", "review", "years", "order", "very", "privacy", "book", "items", "company", "read", "group", "need", "many", "user", "said", "does", "under", "general", "research", "university", "january", "mail", "full", "reviews", "program", "life", "know", "games", "days", "management", "part", "could", "great", "united", "hotel", "real", "item", "international", "center", "ebay", "must", "store", "travel", "comments", "made", "development", "report", "member", "details", "line", "terms", "before", "hotels", "send", "right", "type", "because", "local", "those", "using", "results", "office", "education", "national", "design", "take", "posted", "internet", "address", "community", "within", "states", "area", "want", "phone", "shipping", "reserved", "subject", "between", "forum", "family", "long", "based", "code", "show", "even", "black", "check", "special", "prices", "website", "index", "being", "women", "much", "sign", "file", "link", "open", "today", "technology", "south", "case", "project", "same", "pages", "version", "section", "found", "sports", "house", "related", "security", "both", "county", "american", "photo", "game", "members", "power", "while", "care", "network", "down", "computer", "systems", "three", "total", "place", "following", "download", "without", "access", "think", "north", "resources", "current", "posts", "media", "control", "water", "history", "pictures", "size", "personal", "since", "including", "guide", "shop", "directory", "board", "location", "change", "white", "text", "small", "rating", "rate", "government", "children", "during", "return", "students", "shopping", "account", "times", "sites", "level", "digital", "profile", "previous", "form", "events", "love", "john", "main", "call", "hours", "image", "department", "title", "description", "insurance", "another", "shall", "property", "class", "still", "money", "quality", "every", "listing", "content", "country", "private", "little", "visit", "save", "tools", "reply", "customer", "december", "compare", "movies", "include", "college", "value", "article", "york", "card", "jobs", "provide", "food", "source", "author", "different", "press", "learn", "sale", "around", "print", "course", "canada", "process", "teen", "room", "stock", "training", "credit", "point", "join", "science", "categories", "advanced", "west", "sales", "look", "english", "left", "team", "estate", "conditions", "select", "windows", "photos", "thread", "week", "category", "note", "live", "large", "gallery", "table", "register", "however", "june", "october", "november", "market", "library", "really", "action", "start", "series", "model", "features", "industry", "plan", "human", "provided", "required", "second", "accessories", "cost", "movie", "forums", "march", "september", "better", "questions", "july", "yahoo", "going", "medical", "test", "friend", "come", "server", "study", "application", "cart", "staff", "articles", "feedback", "again", "play", "looking", "issues", "april", "never", "users", "complete", "street", "topic", "comment", "financial", "things", "working", "against", "standard", "person", "below", "mobile", "less", "blog", "party", "payment", "equipment", "login", "student", "programs", "offers", "legal", "above", "recent", "park", "stores", "side", "problem", "give", "memory", "performance", "social", "august", "quote", "language", "story", "sell", "options", "experience", "rates", "create", "body", "young", "america", "important", "field", "east", "paper", "single", "activities", "club", "example", "girls", "additional", "password", "latest", "something", "road", "gift", "question", "changes", "night", "hard", "texas", "four", "poker", "status", "browse", "issue", "range", "building", "seller", "court", "february", "always", "result", "audio", "light", "write", "offer", "blue", "groups", "easy", "given", "files", "event", "release", "analysis", "request", "china", "making", "picture", "needs", "possible", "might", "professional", "month", "major", "star", "areas", "future", "space", "committee", "hand", "cards", "problems", "london", "washington", "meeting", "become", "interest", "child", "keep", "enter", "california", "share", "similar", "garden", "schools", "million", "added", "reference", "companies", "listed", "baby", "learning", "energy", "delivery", "popular", "term", "film", "stories", "computers", "journal", "reports", "welcome", "central", "images", "president", "notice", "original", "head", "radio", "until", "cell", "color", "self", "council", "away", "includes", "track", "australia", "discussion", "archive", "once", "others", "entertainment", "agreement", "format", "least", "society", "months", "safety", "friends", "sure", "trade", "edition", "cars", "messages", "marketing", "tell", "further", "updated", "association", "able", "having", "provides", "david", "already", "green", "studies", "close", "common", "drive", "specific", "several", "gold", "living", "collection", "called", "short", "arts", "display", "limited", "powered", "solutions", "means", "director", "daily", "beach", "past", "natural", "whether", "electronics", "five", "upon", "period", "planning", "database", "says", "official", "weather", "land", "average", "done", "technical", "window", "france", "region", "island", "record", "direct", "microsoft", "conference", "environment", "records", "district", "calendar", "costs", "style", "front", "statement", "update", "parts", "ever", "downloads", "early", "miles", "sound", "resource", "present", "applications", "either", "document", "word", "works", "material", "bill", "written", "talk", "federal", "hosting", "rules", "final", "adult", "tickets", "thing", "centre", "requirements", "cheap", "nude", "kids", "finance", "true", "minutes", "else", "mark", "third", "rock", "gifts", "europe", "reading", "topics", "individual", "tips", "plus", "auto", "cover", "usually", "edit", "together", "videos", "percent", "fast", "function", "fact", "unit", "getting", "global", "tech", "meet", "economic", "player", "projects", "lyrics", "often", "subscribe", "submit", "germany", "amount", "watch", "included", "feel", "though", "bank", "risk", "thanks", "everything", "deals", "various", "words", "linux", "production", "commercial", "james", "weight", "town", "heart", "advertising", "received", "choose", "treatment", "newsletter", "archives", "points", "knowledge", "magazine", "error", "camera", "girl", "currently", "construction", "toys", "registered", "clear", "golf", "receive", "domain", "methods", "chapter", "makes", "protection", "policies", "loan", "wide", "beauty", "manager", "india", "position", "taken", "sort", "listings", "models", "michael", "known", "half", "cases", "step", "engineering", "florida", "simple", "quick", "none", "wireless", "license", "paul", "friday", "lake", "whole", "annual", "published", "later", "basic", "sony", "shows", "corporate", "google", "church", "method", "purchase", "customers", "active", "response", "practice", "hardware", "figure", "materials", "fire", "holiday", "chat", "enough", "designed", "along", "among", "death", "writing", "speed", "html", "countries", "loss", "face", "brand", "discount", "higher", "effects", "created", "remember", "standards", "yellow", "political", "increase", "advertise", "kingdom", "base", "near", "environmental", "thought", "stuff", "french", "storage", "japan", "doing", "loans", "shoes", "entry", "stay", "nature", "orders", "availability", "africa", "summary", "turn", "mean", "growth", "notes", "agency", "king", "monday", "european", "activity", "copy", "although", "drug", "pics", "western", "income", "force", "cash", "employment", "overall", "river", "commission", "package", "contents", "seen", "players", "engine", "port", "album", "regional", "stop", "supplies", "started", "administration", "institute", "views", "plans", "double", "build", "screen", "exchange", "types", "soon", "sponsored", "lines", "electronic", "continue", "across", "benefits", "needed", "season", "apply", "someone", "held", "anything", "printer", "condition", "effective", "believe", "organization", "effect", "asked", "mind", "sunday", "selection", "casino", "lost", "tour", "menu", "volume", "cross", "anyone", "mortgage", "hope", "silver", "corporation", "wish", "inside", "solution", "mature", "role", "rather", "weeks", "addition", "came", "supply", "nothing", "certain", "executive", "running", "lower", "necessary", "union", "according", "clothing", "particular", "fine", "names", "robert", "homepage", "hour", "skills", "bush", "islands", "advice", "career", "military", "rental", "decision", "leave", "british", "teens", "huge", "woman", "facilities", "kind", "sellers", "middle", "move", "cable", "opportunities", "taking", "values", "division", "coming", "tuesday", "object", "lesbian", "appropriate", "machine", "logo", "length", "actually", "nice", "score", "statistics", "client", "returns", "capital", "follow", "sample", "investment", "sent", "shown", "saturday", "christmas", "england", "culture", "band", "flash", "lead", "george", "choice", "went", "starting", "registration", "thursday", "courses", "consumer", "airport", "foreign", "artist", "outside", "furniture", "levels", "channel", "letter", "mode", "phones", "ideas"]
var words_amount = words.length
