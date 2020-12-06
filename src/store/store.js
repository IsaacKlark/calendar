import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import getSelectedDay, { setSelectedDay } from './selectedDay';
import getEvents, { setEvents } from './events';

const reducer = combineReducers({
    day: getSelectedDay,
    events: getEvents
});

export const applyDay = day => dispatch => {
    dispatch(setSelectedDay(day));
};

export const applyEvents = events => dispatch => {
    dispatch(setEvents(events));
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;