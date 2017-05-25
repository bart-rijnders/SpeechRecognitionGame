const FPS = 30;
const UPDATE_INTERVAL = 1000;
const SPAWN_INTERVAL = 500;
const SPEEDUP_INTERVAL = 10;
const SPEED_INCREASE = 0.01;

class Game {

   constructor(canvas, words) {
      this.words = words;
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
         const newWord = this.words[Math.floor(Math.random() * this.words.length)]
         const element = new TextElement(newWord, this.gameSpeed, this.ctx, this);
         this.elements.push(element);
      }
   }

   end() {
      this.running = false;
   }

   foundWord(word) {
      console.log('Got word:', word);
      if (!this.running) return;
      this.textBar.text = word;
      const index = this.elements.findIndex((e) => e.text == word);
      if (index >= 0) {
         this.elements.splice(index, 1);
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
