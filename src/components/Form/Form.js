import React, { useState } from 'react';
import './Form.scss';
import event_calendar from '../../images/event_calendar.png';
import event_clock from '../../images/event_clock.png';
import event_arrow from '../../images/event_arrow.png';
import * as funcsFromStore from '../../store/store';
import { connect } from 'react-redux';
import event_close from '../../images/event_close.png';

const Form = ({ closeForm, parentDate, applyEvents, eventsFromStore, editIndex }) => {
    const [eventName, setEventName] = useState(editIndex === undefined
        ? ""
        : eventsFromStore[editIndex].name
    );
    const [time, setTime] = useState(editIndex === undefined
        ? ""
        : eventsFromStore[editIndex].time
    );
    const [notes, setNotes] = useState(editIndex === undefined
        ? ""
        : eventsFromStore[editIndex].notes
    );
    const date = `${parentDate.getFullYear()}/${parentDate.getMonth()}/${parentDate.getDate()}`;

    const changeTime = e => {
        if (e.target.value.length > 5) {
            return;
        }
        if (e.target.value.length === 3 && e.target.value[2] === ':') {
            setTime(e.target.value);
        }
        if (e.target.value.length === 3 && e.target.value[2] !== ':') {
            return;
        }
        if (e.target.value.match(/[\D]/g) && e.target.value.indexOf(":") !== 2) {
            return;
        }
        if (e.target.value.includes('-') || e.target.value.includes('+')) {
            return;
        }
        if (+e.target.value[0] >= 3) {
            setTime(`0${e.target.value}`);
            return;
        }
        if (+e.target.value[0] !== 0 && +e.target.value[1] > 3) {
            return;
        }
        if (+e.target.value[3] > 5) {
            return;
        }
        setTime(e.target.value);
    }

    const saveEvents = () => {
        const copyEvents = [...eventsFromStore];
        const newEvent = {
            date: parentDate,
            name: eventName,
            time,
            notes
        };
        if (editIndex === undefined) {
            copyEvents.push(newEvent);
        } else {
            copyEvents[editIndex] = newEvent;
        }
        applyEvents(copyEvents);
        closeForm();
    };

    const discard = () => {
        const copyEvents = [...eventsFromStore];
        copyEvents.splice(editIndex, 1);
        applyEvents(copyEvents);
        closeForm();
    }

    return (
        <form
            className="form"
            onSubmit={saveEvents}
        >
            <img src={event_arrow} alt="add event" className="form__arrow" />
            <div className="form__closeWrapper">
                <button
                    type="button"
                    className="form__closeButton"
                    onClick={closeForm}
                >
                    <img
                        src={event_close}
                        alt="close event creator"
                    />
                </button>
            </div>
            <label className="form__inputWrapper" htmlFor="eventName">
                <input
                    type="text"
                    id="eventName"
                    value={eventName}
                    onChange={(e) => { setEventName(e.target.value) }}
                    maxLength="30"
                    className="form__input"
                    placeholder="event name"
                />
            </label>
            <div className="form__inputWrapper form__otherInputsWrapper">
                <input
                    type="text"
                    id="date"
                    className="form__input"
                    placeholder={date}
                    readOnly
                />
                <img src={event_calendar}
                    alt="event date"
                    className="form__image"
                />
            </div>

            <label className="form__inputWrapper form__otherInputsWrapper" htmlFor="time">
                <input
                    type="text"
                    id="time"
                    value={time}
                    className="form__input"
                    placeholder="event time"
                    onChange={e => { changeTime(e) }}
                />
                <img src={event_clock}
                    alt="event date"
                    className="form__image"
                />
            </label>

            <label className="form__inputWrapper form__otherInputsWrapper" htmlFor="notes">
                <input
                    type="text"
                    id="notes"
                    value={notes}
                    className="form__input"
                    placeholder="notes"
                    onChange={e => { setNotes(e.target.value) }}
                    maxLength="30"
                />
            </label>

            <div className="form__lastButtonsWrapper">
                {editIndex === undefined
                    ? <button
                        type="button"
                        className="form__cancel"
                        onClick={closeForm}
                    >
                        Cancel
                    </button>
                    : <button
                        type="button"
                        className="form__cancel"
                        onClick={discard}
                    >
                        Discard
                    </button>
                }
                <button
                    type="submit"
                    className="form__save"
                >
                    {editIndex === undefined ? "Save" : "Edit"}
                </button>
            </div>
        </form>
    );
}

const storeFuncs = {
    applyEvents: funcsFromStore.applyEvents
};

const storeData = state => ({
    eventsFromStore: state.events
});

export default connect(storeData, storeFuncs)(Form);