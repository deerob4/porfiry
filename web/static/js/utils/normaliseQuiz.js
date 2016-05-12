const normaliseQuiz = quiz => ({
  ...quiz,
  questions: quiz.questions.map(q => ({
    id: q.id,
    body: q.body
  })).sort(q => q.id),
  answers: quiz.questions.map(q => (
    q.answers.map(a => ({
      id: a.id,
      body: a.body,
      correct: a.correct,
      questionId: a.questionId
    }))
  )).reduce((a, b) => a.concat(b)).sort(a => a.id)
});

export default normaliseQuiz;
