import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import DocumentTitle from 'react-document-title';
import Actions from 'actions/EditorActions';
import FlexContainer from 'components/FlexContainer';
import Button from 'components/Button';
import QuestionAnswers  from 'components/QuestionAnswers';
import QuestionHeadings from 'components/QuestionHeadings';
import EditorInfo from 'components/EditorInfo';
import QuestionList from 'components/QuestionList';
import ScheduleDialog from 'components/ScheduleDialog';
import Settings from 'components/Settings';

class EditQuiz extends Component {
  componentDidMount() {
    const { connectToEditor, socket, quiz } = this.props;

    connectToEditor(socket, quiz.id);
  }

  componentWillUnmount() {
    const { channel, leaveEditor } = this.props;

    leaveEditor(channel);
  }

  render() {
    const props = this.props;

    const {
      api,
      user,
      quiz,
      dialogues,
      dispatch,
      sessions,
      channel,
      currentQuestion
    } = props;

    const correctAnswer = quiz.questions.find(q => q.id === currentQuestion).correctAnswer;

    return (
      <DocumentTitle title={`${quiz.settings.title} - Porfiry`}>
        <FlexContainer>
          <QuestionList changeQuestion={e => {
                          const parsed = parseInt(e.target.value);
                          props.changeQuestion(parsed);
                        }}
                        currentQuestion={currentQuestion}
                        house={user.house}
                        questions={quiz.questions} />

          <QuestionHeadings editQuestion={newBody => {
                              props.editQuestion(channel, currentQuestion, newBody);
                            }}
                            currentQuestion={currentQuestion}
                            house={user.house}
                            questions={quiz.questions} />

          <EditorInfo api={api}
                    currentQuestion={currentQuestion}
                    house={user.house}
                    questionLength={quiz.settings.questionLength || 0}
                    questions={quiz.questions} />

          <QuestionAnswers answers={quiz.answers}
                           correctAnswer={correctAnswer}
                           currentQuestion={currentQuestion}
                           editAnswer={(body, answerId) => {
                             props.editAnswer(channel, answerId, body);
                           }}
                           house={user.house}
                           markAnswer={(answerId) => {
                             // Ensure the current answer can't be checked.
                             if (answerId !== correctAnswer) {
                               props.markAnswer(channel, currentQuestion, answerId);
                             }
                           }} />

          <div className="button-container button-container--create">
            <Button className="button__Create"
                    house={user.house}
                    onClick={() => props.createQuestion(channel)}>
              Add Question
            </Button>

            <Button className="button__Create"
                    house={user.house}
                    onClick={() => {
                      if (currentQuestion > quiz.questions[0].id) {
                        props.deleteQuestion(channel, currentQuestion);
                      }
                    }}>
              Delete Question
            </Button>

            <Button className="button__Create"
                    house={user.house}
                    onClick={props.openScheduleQuiz}>
              Schedule Quiz
            </Button>

            <Button className="button__Create"
                    house={user.house}
                    onClick={props.openSettings}>
              Quiz Settings
            </Button>

            <Button className="button__Create"
                    house={user.house}
                    onClick={() => browserHistory.push('/')}>
              Leave Editor
            </Button>
          </div>

          <Settings quiz={quiz}
                    house={user.house}
                    updateSettings={settings => props.updateSettings(channel, settings)}
                    closeDialog={props.closeSettings}
                    isOpen={dialogues.settingsAreOpen} />

          <ScheduleDialog house={user.house}
                          startDate={quiz.settings.startDate}
                          isScheduled={quiz.settings.isScheduled}
                          isOpen={dialogues.scheduleQuizIsOpen}
                          updateSchedule={(date, isScheduled) => {
                            props.updateSchedule(channel, date, isScheduled);
                          }}
                          closeDialog={props.closeScheduleQuiz} />
        </FlexContainer>
      </DocumentTitle>
    );
  }
}

const mapDispatchToProps = {
  connectToEditor: Actions.connectToEditor,
  leaveEditor: Actions.leaveEditor,
  changeQuestion: Actions.changeQuestion,
  editQuestion: Actions.editQuestion,
  editAnswer: Actions.editAnswer,
  markAnswer: Actions.markAnswerAsCorrect,
  createQuestion: Actions.createQuestion,
  deleteQuestion: Actions.deleteQuestion,
  openSettings: Actions.openSettings,
  closeSettings: Actions.closeSettings,
  openScheduleQuiz: Actions.openScheduleQuiz,
  closeScheduleQuiz: Actions.closeScheduleQuiz,
  updateSchedule: Actions.updateSchedule,
};

const mapStateToProps = state => ({
  api: state.api,
  user: state.user,
  quiz: state.editor,
  currentQuestion: state.editor.currentQuestion,
  socket: state.sessions.socket,
  channel: state.sessions.editorChannel,
  sessions: state.sessions,
  dialogues: state.dialogues
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuiz);
