

function show(screen) {
   $('#endScreen').hide();
   $('#game').hide();
   $('#gameSelect').hide();
   $(`#${screen}`).show();
}

function showEndScreen(result) {
   $('#score').html(result.score);
   show('endScreen');
}

function showGameSelect() {
   show('gameSelect');
}

function startGame(gameType) {
   const canvas = createCanvas();
   const words = getWords();
   const game = new gameType(canvas, words);
   game.ended(result => showEndScreen(result));
   show('game');
   game.run();
}

// Initialized and runs the game on document load
document.addEventListener('DOMContentLoaded', (event) => {
   $('#voiceGame').click(() => startGame(VoiceGame));
   $('#typingGame').click(() => startGame(TypingGame));
   $('#backButton').click(showGameSelect);
});
