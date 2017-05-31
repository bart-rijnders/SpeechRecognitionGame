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
      this.scoreCounter = new Text(this.ctx, 20, 20, '0', { color: 'red' });
      this.running = true;
      this.gameEndListeners = [];
      this._loop;
   }

   spawn() {
      const time = new Date().getTime();
      if (time >= this.lastSpawned + SPAWN_INTERVAL) {
         this.lastSpawned = time;
         const newWord = this.words[Math.floor(Math.random() * this.words.length)]
         const element = new TextElement(this.ctx, newWord, this.gameSpeed, this);
         element.outOfBounds(() => {
            this.end();
         });
         this.elements.push(element);
      }
   }

   end() {
      this.running = false;
      clearInterval(this._loop);
      const result = {
         win: false,
         score: this.score
      };
      this.gameEndListeners.forEach(x => x(result));
   }

   foundWord(word) {
      if (!this.running) return;
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
      this.scoreCounter.text = this.score;
   }

   draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (!this.running) {
         /*this.ctx.font = '24px Arial';
         this.fillStyle = 'red';
         this.ctx.fillText(`Game Over! You got ${this.score} points.`, window.innerWidth / 2, window.innerHeight / 2);
         */
      } else {
         this.elements.forEach(x => x.draw());
         this.scoreCounter.draw();
      }
   }

   ended(func) {
      this.gameEndListeners.push(func);
   }

   run() {
      this._loop = setInterval(() => {
           this.update();
           this.draw();
      }, UPDATE_INTERVAL / FPS);
   }
}
