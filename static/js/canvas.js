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

function createCanvas() {
   const canvas = document.getElementById('game');
   const w = window.innerWidth
   const h = window.innerHeight;
   setHiDPICanvas(canvas, w, h);
   const ctx = canvas.getContext('2d');
   ctx.font = "14px Arial";
   ctx.textAlign="center";
   return canvas;
}
