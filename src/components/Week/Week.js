import React, { Fragment, useState } from 'react';
import './Week.scss';
import * as funcsFromStore from '../../store/store';
import { connect } from 'react-redux';

const Week = ({ selectedDay, eventsFromStore }) => {
    const getWeekDates = (date, value) => {
        let D = new Date(date);
        D.setDate(D.getDate() + value);

        return D;
    }

    const weekDay = selectedDay.getDay();
    const [weekStart, setWeekStart] = useState(getWeekDates(selectedDay, -weekDay));
    let weekEnd = getWeekDates(weekStart, 6);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

    const goToDay = () => {
        setWeekStart(new Date());
    }

    const prevWeek = () => {
        setWeekStart(getWeekDates(weekStart, -7));
    }

    const nextWeek = () => {
        setWeekStart(getWeekDates(weekStart, 7));
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
                            onClick={prevWeek}
                        >
                            Back
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="month__button"
                            onClick={nextWeek}
                        >
                            Next
                        </button>
                    </li>
                </ul>
                <h3 className="week__monthName">
                    {months[weekStart.getMonth()]} {weekStart.getDate()} - {months[weekEnd.getMonth()]} {weekEnd.getDate()}
                </h3>
            </div>
            <div className="week">
                <p className="week__weekEmpty">
                </p>

                {
                    weekDays.map((value, index) => {
                        const currentDay = getWeekDates(weekStart, index);
                        const day = currentDay.getDate().toString().length > 1
                            ? currentDay.getDate()
                            : '0' + currentDay.getDate();
                        const month = currentDay.getMonth().toString().length > 1
                            ? currentDay.getMonth()
                            : '0' + currentDay.getMonth();

                        return (
                            <p className="week__week" key={value}>
                                {value} {day}/{month}
                            </p>
                        )
                    })
                }

                {
                    tableData.map(value => {
                        return (
                            <Fragment key={value.name}>
                                <p className="week__tableData" >
                                    {value.name}
                                </p>
                                {
                                    weekDays.map((week, index) => {
                                        return (
                                            <div key={week + value.name}
                                                className={`week__tableData week__noPadding ${index === weekDay
                                                    ? "week__highlight"
                                                    : ""}`
                                                }>
                                                {
                                                    eventsFromStore.map((result, index2) => {
                                                        if (getWeekDates(weekStart, index).getFullYear() === result.date.getFullYear()
                                                            && getWeekDates(weekStart, index).getMonth() === result.date.getMonth()
                                                            && getWeekDates(weekStart, index).getDate() === result.date.getDate()
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
                                        )
                                    })
                                }
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

export default connect(storeData, storeFuncs)(Week);