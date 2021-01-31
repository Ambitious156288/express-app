const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

const fillQuestionElement = (data) => {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "YOU WIN!!!";
    return;
  }

  question.innerText = data.question;

  for (const i in data.answers) {
    const replies = document.querySelector(`#answer${Number(i) + 1}`);
    replies.innerText = data.answers[i];
  }
};

const showNextQuestion = () => {
  fetch("/question", { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      fillQuestionElement(data);
    });
};

showNextQuestion();

const correctAnswersSpan = document.querySelector("#correct-answers");

const handleAnswerFeedback = (data) => {
  correctAnswersSpan.innerText = data.correctAnswers;
  showNextQuestion();
};

const sendAnswer = (answerIndex) => {
  fetch(`/answer/${answerIndex}`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      handleAnswerFeedback(data);
    });
};

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
