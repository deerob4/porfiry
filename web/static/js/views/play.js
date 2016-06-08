import React, { Component } from 'react';
import { connect } from 'react-redux';
import Actions from 'actions/PlayerActions';
import FlexContainer from 'components/FlexContainer';
import QuestionTimer from 'components/QuestionTimer';
import Countdown from 'components/Countdown';
import Button from 'components/Button';
import HeadingPrimary from 'components/Headings/HeadingPrimary';
import HeadingSecondary from 'components/Headings/HeadingSecondary';

class PlayView extends Component {
  componentWillMount() {
    const { sessions, user, countdown, dispatch } = this.props;

    dispatch(Actions.connectToQuiz(sessions.socket, user, countdown.id));
  }

  componentWillUnmount() {
    const { dispatch, sessions } = this.props;

    dispatch(Actions.leaveQuiz(sessions.quizChannel));
  }

  render() {
    const { quizStatus, quiz, countdown, user } = this.props;
    const { house, year } = user;

    if (quizStatus === 'countingDown') {
      return <Countdown house={user.house} timeLeft={countdown.remaining} />;
    }

    return (
      <FlexContainer>
        <HeadingPrimary house={house}
                        type={'player'}>
          {quiz.question}
        </HeadingPrimary>

        <HeadingSecondary house={house}
                          type={'player'}>
          Question 1 out of 2 &nbsp; •  &nbsp; Playing as {year}{house[0].toUpperCase()} &nbsp; • &nbsp;  0 / 1 correct
        </HeadingSecondary>

        <QuestionTimer />

        {quiz.answers.map((answer, i) => (
          <div key={i}>
            <span>{['A', 'B', 'C', 'D'][i]}</span>
            <p>{answer.body}</p>
          </div>
        ))}

        <Button house={user.house}>Toggle peek</Button>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  sessions: state.sessions,
  countdown: state.player.countdown,
  quiz: state.player.quiz,
  quizStatus: state.quizStatus
});

export default connect(mapStateToProps)(PlayView);
