import React, { useState, Fragment } from 'react';
import './Day.scss';
import * as funcsFromStore from '../../store/store';
import { connect } from 'react-redux';

const Day = ({ selectedDay, eventsFromStore }) => {
    const [day, setDay] = useState(selectedDay);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const tableData = [
        { name: "all day", time: undefined },
        { name: "12:00 AM", time: 0 },
        { name: "2:00 AM", time: 2 },
        { name: "4:00 AM", time: 4 },
        { name: "6:00 AM", time: 6 },
        { name: "8:00 AM", time: 8 },
        { name: "10:00 AM", time: 10 },
        { name: "12:00 PM", time: 12 },
        { name: "2:00 PM", time: 14 },
        { name: "4:00 PM", time: 16 },
        { name: "6:00 PM", time: 18 },
        { name: "8:00 PM", time: 20 },
        { name: "10:00 PM", time: 22 }
    ];

    const getWeekDates = (date, value) => {
        let D = new Date(date);
        D.setDate(D.getDate() + value);

        return D;
    }

    const goToDay = () => {
        setDay(new Date());
    }

    const prevDay = () => {
        setDay(getWeekDates(day, -1));
    }

    const nextDay = () => {
        setDay(getWeekDates(day, 1));
    }

    return (
        <>
            <div className="month__bottomHeaderWrapper">
                <ul className="month__buttonsList">
                    <li>
                        <button
                            type="button"
                            className="month__button"
                            onClick={goToDay}
                        >
                            Today
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="month__button"
                            onClick={prevDay}
                        >
                            Back
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="month__button"
                            onClick={nextDay}
                        >
                            Next
                        </button>
                    </li>
                </ul>
                <h3 className="week__monthName">
                    {weekDays[day.getDay()]} {months[day.getMonth()]} {day.getDate()}
                </h3>
            </div>
            <p className="day__head">
                {weekDays[day.getDay()]} {months[day.getMonth()]} {day.getDate()}
            </p>
            <div className="day">
                {
                    tableData.map((value) => {
                        return (
                            <Fragment key={value.name}>
                                <p className="week__tableData" >
                                    {value.name}
                                </p>
                                <div className="day__highlight">
                                    {
                                        eventsFromStore.map((result, index2) => {
                                            if (getWeekDates(day, 0).getFullYear() === result.date.getFullYear()
                                                && getWeekDates(day, 0).getMonth() === result.date.getMonth()
                                                && getWeekDates(day, 0).getDate() === result.date.getDate()
                                            ) {
                                                if (+result.time.split(":")[0] - value.time >= 0
                                                    && +result.time.split(":")[0] - value.time < 2
                                                    && result.time) {
                                                    return (
                                                        <div className="month__event" key={result.name + index2}>
                                                            {result.name}
                                                        </div>
                                                    )
                                                } else if (!result.time && value.time === undefined) {
                                                    return (
                                                        <div className="month__event" key={result.name + index2}>
                                                            {result.name}
                                                        </div>
                                                    )
                                                } else {
                                                    return;
                                                }
                                            } else {
                                                return;
                                            }
                                        })
                                    }
                                </div>
                            </Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}

const storeFuncs = {
    applyDay: funcsFromStore.applyDay
};

const storeData = state => ({
    selectedDay: state.day,
    eventsFromStore: state.events
});

export default connect(storeData, storeFuncs)(Day);