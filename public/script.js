const question = document.querySelector("#question");

const fillQuestionElement = (data) => {
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

const sendAnswer = (answerIndex) => {
  fetch(`/answer/${answerIndex}`, { method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", () => {
    console.log("aa");
  });
}
