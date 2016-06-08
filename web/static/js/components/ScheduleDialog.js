import React, { Component, PropTypes } from 'react';
import Modal from 'react-modal';
import Button from 'components/Button';
import dialogStyle from 'utils/dialogStyle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

function constructDate(date, time) {
  date = moment(date).format('DD-MM-YYYY');
  const x = moment(date + ' ' + time, 'DD-MM-YYYY HH:mm');
  return x._d;
}

class ScheduleDialog extends Component {
  constructor(props) {
    super(props);

    this.changeDate = this.changeDate.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.changeIsScheduled = this.changeIsScheduled.bind(this);

    this.state = {
      startDate: moment(this.props.startDate),
      startTime: moment(this.props.startDate).format('HH:mm'),
      isScheduled: this.props.isScheduled
    };
  }

  changeDate(date) {
    this.setState({ startDate: date});
  }

  changeTime(time) {
    this.setState({ startTime: time.target.value });
  }

  changeIsScheduled(e) {
    this.setState({ isScheduled: e.target.checked });
  }

  render() {
    const { isOpen, closeDialog, house, scheduleQuiz, updateSchedule, isScheduled } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        style={{ ...dialogStyle(house, 370) }}
        onRequestClose={closeDialog}>

        <h2 className={`heading--primary--${house} centre`}>
          Schedule Quiz
        </h2>

        <form className="form__Schedule">
          <label className="field">
            Start date
            <br />
            <DatePicker className={`input--${house} input__Settings form__Settings--Numbers`}
                        dateFormat="DD/MM/YYYY"
                        minDate={moment()}
                        maxDate={moment().add(1, 'year')}
                        onChange={this.changeDate}
                        selected={this.state.startDate} />
          </label>

          <label className="field">
            Start time
            <br />
            <input className={`input--${house} input__Settings form__Settings--Numbers`}
                   onChange={this.changeTime}
                   value={this.state.startTime}
                   type="text"
                   ref="startTime"
                   placeholder="Start time" />
          </label>

          <label>
            Quiz scheduled?
            <input type="checkbox"
                   defaultChecked={isScheduled}
                   onChange={this.changeIsScheduled} />
          </label>
        </form>

        <Button className="button__Settings"
                house={house}
                size="small"
                onClick={() => {
                  const { startDate, startTime, isScheduled } = this.state;
                  // Combine the date and time into one.
                  const date = constructDate(startDate, startTime);
                  updateSchedule(date, isScheduled);
                  closeDialog();
                }}>
          Schedule
        </Button>

        <Button className="button__Settings"
                house={house}
                size="small"
                onClick={closeDialog}>
          Cancel
        </Button>
      </Modal>
    );
  }
}

export default ScheduleDialog;
