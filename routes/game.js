const gameRoutes = (app) => {
  let correctAnswers = 0;

  let callAFriend = false;
  let askTheCroud = false;
  let fiftyFifty = false;
  let isGameOver = false;

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
    else if (isGameOver) res.json({ loser: true });
    else {
      const nextQuestion = quesions[correctAnswers];
      const { question, answers } = nextQuestion;

      res.json({ question, answers });
    }
  });

  app.post("/answer/:index", (req, res) => {
    if (isGameOver) res.json({ loser: true });

    const { index } = req.params;
    const actualQuestion = quesions[correctAnswers];
    const isCorrectAnswer = actualQuestion.correctAnswer === Number(index);

    if (isCorrectAnswer) correctAnswers++;
    else isGameOver = true;

    res.json({
      correct: isCorrectAnswer,
    });
  });

  app.get("/help/friend", (req, res) => {
    if (callAFriend) {
      return res.json({ text: "It was used " });
    }

    callAFriend = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;

    const actualQuestion = quesions[correctAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Hmm, Maybe ${actualQuestion.answers[actualQuestion.correctAnswer]}`
        : "IDK",
    });
  });
};

module.exports = gameRoutes;
