const Utils = {
  findLetterTerm(n) {
    let previousMultiple;
    const letters = ['A', 'B', 'C', 'D'];

    for (let i = n; i >= 0; i--) {
      if (i % 4 === 0) {
        previousMultiple = i;
        break;
      }
    }

    return letters[n-previousMultiple];
  },

  nextId(array, key = 'id') {
    // Collect all the ids in the array.
    const ids = array.reduce((arr, obj) => [...arr, obj[key]], []);
    // Finds the next biggest value in an array.
    return Math.max(...ids) + 1;
  },

  normaliseQuiz(quiz) {
    return {
      ...quiz,
      questions: quiz.questions.map(q => ({
        id: q.id,
        body: q.body,
        correctAnswer: q.correctAnswer
      })).sort(q => q.id),
      answers: quiz.questions.map(q => (
        q.answers.map(a => ({
          id: a.id,
          body: a.body,
          correct: a.correct,
          questionId: a.questionId
        }))
      )).reduce((a, b) => a.concat(b)).sort(a => a.id)
    };
  },

  previousFromIndex(array, value, key = 'id') {
    const index = array.findIndex(x => x[key] === value);
    return array[index - 1][key];
  }
};

export default Utils;
