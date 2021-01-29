const gameRoutes = (app) => {
  let correctAnswers = 0;

  let callAFriend = false;
  let askTheCroud = false;
  let fiftyFifty = false;

  const quesions = [
    {
      question: "question1 ?",
      answers: ["ans1", "ans2", "ans3", "ans4"],
      correctAnswer: 3,
    },
    {
      question: "question2 ?",
      answers: ["ans1", "ans2", "ans3", "ans4"],
      correctAnswer: 3,
    },
    {
      question: "question3 ?",
      answers: ["ans1", "ans2", "ans3", "ans4"],
      correctAnswer: 3,
    },
  ];

  app.get("/question", (req, res) => {
    if (correctAnswers === quesions.length) res.json({ winner: true });
    else {
      const nextQuestion = quesions[correctAnswers];
      const { question, answers } = nextQuestion;

      res.json({ question, answers });
    }
  });
};

module.exports = gameRoutes;
