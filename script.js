const leftNumber = document.querySelector("#left-number");
const rightNumber = document.querySelector("#right-number");
const compareMark = document.querySelector("#compare-mark");
const message = document.querySelector("#message");
const scoreText = document.querySelector("#score");
const streakText = document.querySelector("#streak");
const level = document.querySelector("#level");
const nextBtn = document.querySelector("#next-btn");
const resetBtn = document.querySelector("#reset-btn");
const choiceButtons = document.querySelectorAll("[data-choice]");

let currentAnswer = "=";
let score = 0;
let streak = 0;
let answered = false;

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function buildQuestion() {
  const max = Number(level.value);
  const left = randomNumber(max);
  const right = randomNumber(max);

  leftNumber.textContent = left;
  rightNumber.textContent = right;
  currentAnswer = left > right ? ">" : left < right ? "<" : "=";
  answered = false;

  compareMark.textContent = "?";
  message.textContent = "請選出正確答案。";
  message.className = "message";
  choiceButtons.forEach((button) => {
    button.disabled = false;
  });
}

function updateScore() {
  scoreText.textContent = score;
  streakText.textContent = streak;
}

function answerQuestion(choice) {
  if (answered) {
    return;
  }

  answered = true;
  compareMark.textContent = currentAnswer;
  choiceButtons.forEach((button) => {
    button.disabled = true;
  });

  if (choice === currentAnswer) {
    score += 10;
    streak += 1;
    message.textContent = "答對了！按下一題繼續挑戰。";
    message.className = "message correct";
  } else {
    streak = 0;
    message.textContent = `答錯了，正確答案是 ${currentAnswer}`;
    message.className = "message wrong";
  }

  updateScore();
}

function resetGame() {
  score = 0;
  streak = 0;
  updateScore();
  buildQuestion();
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => answerQuestion(button.dataset.choice));
});

nextBtn.addEventListener("click", buildQuestion);
resetBtn.addEventListener("click", resetGame);
level.addEventListener("change", resetGame);

resetGame();
