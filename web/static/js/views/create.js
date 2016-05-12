import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import Settings from 'components/Settings';
import QuizInfo from 'components/QuizInfo';
import { browserHistory } from 'react-router';
import actions from 'actions/CreateActions';
import DocumentTitle from 'react-document-title';
import QuestionList from 'components/QuestionList';
import ScheduleDialog from 'components/ScheduleDialog';
import QuestionAnswers  from 'components/QuestionAnswers';
import QuestionHeadings from 'components/QuestionHeadings';

class CreateQuiz extends Component {
  render() {
    const { api, user, quiz, dialogues, dispatch } = this.props;
    const currentQuestion = quiz.currentQuestion;
    const answers = quiz.answers.filter(answer => answer.questionId === currentQuestion);

    return (
      <DocumentTitle title={`${quiz.settings.title} - Porfiry`}>
        <div className="flexbox-container">
          <div className="create__inner">
            <QuestionList changeQuestion={e => {
                            const parsed = parseInt(e.target.value);
                            dispatch(actions.changeQuestion(parsed));
                          }}
                          currentQuestion={currentQuestion}
                          house={user.house}
                          questions={quiz.questions} />

            <QuestionHeadings editQuestion={newBody => (
                                dispatch(actions.editQuestion(newBody, currentQuestion))
                              )}
                              currentQuestion={currentQuestion}
                              house={user.house}
                              questions={quiz.questions} />

            <QuizInfo api={api}
                      currentQuestion={currentQuestion}
                      house={user.house}
                      questionLength={quiz.settings.questionLength || 0}
                      questions={quiz.questions} />

            <QuestionAnswers answers={quiz.answers}
                             currentQuestion={currentQuestion}
                             editAnswer={(body, answerId) => (
                               dispatch(actions.editAnswer(body, answerId))
                             )}
                             house={user.house}
                             markAnswer={(answerId) => {
                               // Ensure the current answer can't be checked.
                               const currentCorrect = answers.find(a => a.correct).id;
                               if (answerId !== currentCorrect) {
                                 dispatch(actions.markAnswerAsCorrect(answerId, currentQuestion));
                               }
                             }} />

            <div className="button-container button-container--create">
              <Button className="button__Create"
                      house={user.house}
                      onClick={() => dispatch(actions.createQuestion())}>
                Add Question
              </Button>

              <Button className="button__Create"
                      house={user.house}
                      onClick={() => {
                        if (currentQuestion > quiz.questions[0].id) {
                          dispatch(actions.deleteQuestion(currentQuestion));
                        }
                      }}>
                Delete Question
              </Button>

              <Button className="button__Create"
                      house={user.house}
                      onClick={() => dispatch(actions.openScheduleQuiz())}>
                Schedule Quiz
              </Button>

              <Button className="button__Create"
                      house={user.house}
                      onClick={() => dispatch(actions.openSettings())}>
                Quiz Settings
              </Button>

              <Button className="button__Create"
                      house={user.house}
                      onClick={() => browserHistory.push('/')}>
                Leave Editor
              </Button>
            </div>
          </div>

          <Settings quiz={quiz}
                    house={user.house}
                    updateSettings={settings => (
                      dispatch(actions.updateSettings(settings))
                    )}
                    isOpen={dialogues.settingsAreOpen}
                    closeDialog={() => dispatch(actions.closeSettings())} />

          <ScheduleDialog house={user.house}
                          startDate={quiz.settings.startDate}
                          isScheduled={quiz.settings.isScheduled}
                          isOpen={dialogues.scheduleQuizIsOpen}
                          updateSchedule={(date, isScheduled) => (
                            dispatch(actions.updateSchedule(date, isScheduled))
                          )}
                          closeDialog={() => dispatch(actions.closeScheduleQuiz())} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  user: state.user,
  quiz: state.quiz,
  dialogues: state.dialogues
});

export default connect(mapStateToProps)(CreateQuiz);
