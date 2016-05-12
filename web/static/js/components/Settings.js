import React, { Component } from 'react';
import Button from 'components/Button';
import Modal from 'react-modal';
import dialogStyle from 'utils/dialogStyle';

class SettingsDialog extends Component {
  constructor() {
    super();

    this.updateSettings = this.updateSettings.bind(this);
  }

  updateSettings() {
    const quiz = this.props.quiz.settings;

    this.props.updateSettings({
      title: this.refs.title.value || quiz.title,
      questionLength: parseInt(this.refs.questionLength.value, 10) || quiz.questionLength,
      breakLength: parseInt(this.refs.breakLength.value * 1000, 10) || quiz.breakLength,
      specialEvents: this.refs.specialEvents.value || quiz.specialEvents,
      isScheduled: quiz.isScheduled
    });

    this.props.closeDialog();
  }

  render() {
    const { isOpen, closeDialog, quiz, house } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        style={dialogStyle(house)}
        onRequestClose={closeDialog}>

        <h2 className={`heading--primary--${house} heading__Settings centre`}>Quiz Settings</h2>

        <form className="form__Settings">
          <label>
            Quiz Title
            <br />
            <input className={`input--${house} input__Settings input__Settings--title`}
                   type="text"
                   ref="title"
                   placeholder={quiz.settings.title} />
          </label>
          <div className="form__Settings--Numbers">
            <label>
              Question Length
              <br />
              <input className={`input--${house} input__Settings`}
                     type="number"
                     min="1"
                     max="3600"
                     ref="questionLength"
                     placeholder={`${quiz.settings.questionLength} seconds`} />
            </label>
            <label>
              Break Length
              <br />
              <input className={`input--${house} input__Settings`}
                     type="number"
                     min="1"
                     max="60"
                     ref="breakLength"
                     placeholder={`${quiz.settings.breakLength / 1000} minutes`} />
            </label>
          </div>
          <label>
            Special Events
            <input className={`input--${house} input__Settings`}
                   type="checkbox"
                   ref="specialEvents"
                   default="true" />
          </label>
        </form>
        <div className="button-container">
          <Button className="button__Settings"
                  house={house}
                  size="small"
                  onClick={this.updateSettings}>
            Save settings
          </Button>
          <Button className="button__Settings"
                  house={house}
                  size="small"
                  onClick={() => closeDialog()}>
            Cancel changes
          </Button>
        </div>
      </Modal>
    );
  }
}

export default SettingsDialog;
