import React, { Component } from 'react';
import Modal from 'react-modal';
import Button from 'components/Button';
import dialogStyle from 'utils/dialogStyle';
import LoadQuizBlock from 'components/LoadQuizBlock';

class LoadQuizDialog extends Component {
  render() {
    const { isOpen, closeDialog, house, api, quizzes, fetchQuiz, deleteQuiz } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        style={dialogStyle(house)}
        onRequestClose={closeDialog}>

        <h2 className={`heading--primary--${house} centre`}>
          Load a Quiz
        </h2>

        <div className="load-quiz-blocks">
          {
            api.isSaving
              ? <h3>Looking for quizzes... <i className="fa fa-circle-o-notch fa-spin"></i></h3> :
            api.saveFailed
              ? <h3>Error looking for quizzes.</h3> :
            !quizzes.length
              ? <h3>No quizzes have been saved.</h3> :

            quizzes.map(quiz =>
              <LoadQuizBlock key={quiz.id}
                             quiz={quiz}
                             house={house}
                             loadQuiz={() => {
                               closeDialog();
                               fetchQuiz(quiz.id);
                             }}
                             deleteQuiz={() => deleteQuiz(quiz.id)} />
            )
          }
        </div>
      </Modal>
    );
  }
}

export default LoadQuizDialog;
