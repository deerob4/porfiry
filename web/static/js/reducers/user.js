import { combineReducers } from 'redux';
import * as constants from '../constants';

function year(state = '7', action) {
  switch (action.type) {
    case constants.CHANGE_YEAR:
      return action.year;

    default:
      return state;
  }
}

function house(state = 'acton', action) {
  switch (action.type) {
    case constants.CHANGE_HOUSE:
      return action.house;

    default:
      return state;
  }
}

export default combineReducers({ year, house });
