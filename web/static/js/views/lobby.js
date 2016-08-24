import React, { Component } from 'react';
import { connect } from 'react-redux';
import LobbyButtons from 'components/LobbyButtons';
import capitalise from 'lodash/capitalize';
import { HOUSES, YEARS } from '../constants';
import Actions from 'actions/LobbyActions';
import DocumentTitle from 'react-document-title';
import LoadQuizDialog from 'components/LoadQuizDialog';

class LobbyView extends Component {
  componentDidMount() {
    const { sessions, connectToLobby } = this.props;
    connectToLobby(sessions.socket);
  }

  componentWillUnmount() {
    const { sessions, leaveLobby } = this.props;
    leaveLobby(sessions.lobbyChannel);
  }

  render() {
    const props = this.props;

    const { api, quizStatus } = props;
    const { house, year } = props.user;
    const { loadQuizIsOpen, loadedQuizzes } = props.dialogues;

    return (
      <DocumentTitle title="Lobby - Posrfiry">
        <div className="flexbox-container">
          <div className="lobby">
            <div className="animated bounceInDown">
              <h1 className={`heading--primary--${house} centre`}>
                Priory School Quiz
              </h1>

              <p className={`heading--secondary--${house} centre`}>
                Hello! Choose your house and year to get started!
              </p>
            </div>

            <div className="animated bounceInUp">
              <select
                className={`select__Login select--${house}`}
                value={house}
                onChange={e => props.changeHouse(e.target.value)}>

                {HOUSES.map((house, i) =>
                  <option key={i} value={house}>
                    {capitalise(house)}
                  </option>
                )}
              </select>

              <select
                className={`select__Login select--${house}`}
                value={year}
                onChange={e => props.changeYear(e.target.value)}>

                {YEARS.map((year, i) =>
                  <option key={i} value={year}>
                    {`Year ${year}`}
                  </option>
                )}
              </select>

              <LobbyButtons
                quizStatus={quizStatus}
                house={house}
                createQuiz={() => props.createQuiz()}
                loadQuiz={() => props.openLoadQuizDialog()}
                joinQuiz={() => props.joinQuiz()} />
            </div>
          </div>

          <LoadQuizDialog
            quizzes={loadedQuizzes}
            isOpen={loadQuizIsOpen}
            api={api}
            house={house}
            fetchQuiz={quizId => props.fetchQuiz(quizId)}
            deleteQuiz={quizId => props.deleteQuiz(quizId)}
            closeDialog={() => props.closeLoadQuizDialog()} />
        </div>
      </DocumentTitle>
    );
  }
}

const mapDispatchToProps = {
  connectToLobby: Actions.connectToLobby,
  leaveLobby: Actions.leaveLobby,
  changeHouse: Actions.changeHouse,
  changeYear: Actions.changeYear,
  createQuiz: Actions.createQuiz,
  joinQuiz: Actions.joinQuiz,
  fetchQuiz: Actions.fetchQuiz,
  deleteQuiz: Actions.deleteQuiz,
  openLoadQuizDialog: Actions.openLoadQuizDialog,
  closeLoadQuizDialog: Actions.closeLoadQuizDialog
};

const mapStateToProps = state => ({
  api: state.api,
  user: state.user,
  sessions: state.sessions,
  dialogues: state.dialogues,
  quizStatus: state.quizStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyView);
