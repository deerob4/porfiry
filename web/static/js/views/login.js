import React, { Component } from 'react';
import socket from '../socket';
import { connect } from 'react-redux';
import Button from 'components/Button';
import capitalise from 'lodash/capitalize';
import { HOUSES, YEARS } from '../constants';
import actions from 'actions/LoginActions';
import DocumentTitle from 'react-document-title';
import LoadQuizDialog from 'components/LoadQuizDialog';

class LoginView extends Component {
  componentDidMount() {
    const channel = socket.channel('quizzes:lobby');
    channel.join();
    channel.on('user_joined', (x) => console.log(x));
    channel.on('schedule_quiz', q => console.log(q));
  }

  render() {
    const dispatch = this.props.dispatch;
    const { house, year } = this.props.user;
    const { loadQuizIsOpen, loadedQuizzes } = this.props.dialogues;

    return (
      <DocumentTitle title="Login - Porfiry">
        <div className="flexbox-container">
          <div className="inner">
            <h1 className={`heading--primary--${house} centre`}>
              Priory School Quiz
            </h1>

            <p className={`heading--secondary--${house } centre`}>
              Hello! Choose your house and year to get started!
            </p>

            <select className={`select__Login select--${house}`}
                    value={house}
                    onChange={e => dispatch(actions.changeHouse(e.target.value))}>
              {HOUSES.map((house, i) =>
                <option key={i} value={house}>
                  {capitalise(house)}
                </option>
              )}
            </select>

            <select className={`select__Login select--${house}`}
                    value={year}
                    onChange={e => dispatch(actions.changeYear(e.target.value))}>
              {YEARS.map((year, i) =>
                <option key={i} value={year}>
                  {`Year ${year}`}
                </option>
              )}
            </select>

            <div className="button-container button-container--login">
              <Button className="button__Login"
                      house={house}
                      onClick={() => dispatch(actions.createQuiz())}>
                Create a new quiz
              </Button>
              <Button className="button__Login"
                      house={house}
                      onClick={() => dispatch(actions.openLoadQuizDialog())}>
                Load a quiz
              </Button>
            </div>
          </div>
          <LoadQuizDialog quizzes={loadedQuizzes}
                          isOpen={loadQuizIsOpen}
                          api={this.props.api}
                          house={house}
                          fetchQuiz={quizId => dispatch(actions.fetchQuiz(quizId))}
                          deleteQuiz={quizId => dispatch(actions.deleteQuiz(quizId))}
                          closeDialog={() => dispatch(actions.closeLoadQuizDialog())} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  api: state.api,
  user: state.user,
  dialogues: state.dialogues
});

export default connect(mapStateToProps)(LoginView);
