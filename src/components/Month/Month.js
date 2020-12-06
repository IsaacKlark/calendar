import React, { useState } from 'react';
import './Month.scss';
import * as funcsFromStore from '../../store/store';
import { connect } from 'react-redux';
import Form from '../Form/Form';

const Month = ({ applyDay, selectedDay, eventsFromStore }) => {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [event, setEvent] = useState(undefined);
    const [changeEvent, setChangeEvent] = useState(undefined);

    const leapYear = year % 4 !== 0
        ? 28
        : year % 100 !== 0
            ? 29
            : year % 400 === 0
                ? 29
                : 28;
    const firstDayOfCurrentMonth = new Date(year, month, 1);
    const firstWeekDayOfMonth = firstDayOfCurrentMonth.getDay();
    const monthsLength = [31, leapYear, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dates = [];

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    //creating dates

    let dateId = 0;

    for (let i = 0; i < monthsLength[month]; i++) {
        dates.push({ day: i + 1, currentMonth: true, id: dateId, month });
        dateId++;
    }

    //if first week includes previous month - add it

    for (let i = monthsLength[month > 0 ? month - 1 : 11];
        i > monthsLength[month > 0 ? month - 1 : 11] - firstWeekDayOfMonth;
        i--
    ) {
        dates.unshift({
            day: i,
            currentMonth: false,
            month: month > 0 ? month - 1 : 11,
            id: dateId
        });
        dateId++;
    }

    let addDates = 1;

    //if last week includes next month - add it

    while (dates.length % 7 !== 0) {
        dates.push({
            day: addDates,
            currentMonth: false,
            month: month < 11 ? month + 1 : 0,
            id: dateId
        });
        dateId++;
        addDates++;
    }

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const goToDay = () => {
        setMonth(new Date().getMonth());
        setYear(new Date().getFullYear());
    }

    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const editEvent = (currentDay, index) => {
        setEvent(currentDay);
        setChangeEvent(index);
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
                            onClick={previousMonth}
                        >
                            Back
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="month__button"
                            onClick={nextMonth}
                        >
                            Next
                        </button>
                    </li>
                </ul>
                <h3 className="month__monthName">
                    {months[month]} {year}
                </h3>
            </div>
            <div className="month">
                {weekDays.map(value => (
                    <p className="month__week" key={value}>
                        {value}
                    </p>
                ))}

                {
                    dates.map(date => {
                        const currentDay = new Date(year, date.month, date.day);
                        let highLightDay = false;

                        if (currentDay.getFullYear() === selectedDay.getFullYear()
                            && currentDay.getMonth() === selectedDay.getMonth()
                            && currentDay.getDate() === selectedDay.getDate()
                        ) {
                            highLightDay = true;
                        }

                        return (
                            <div className="month__dateWrapper" key={date.id}>
                                <div
                                    role="button"
                                    className={`
                                    month__date 
                                    ${highLightDay ? "month__highLightDay" : ""}
                                    ${date.currentMonth ? "" : "month__otherMonth"}
                                `}
                                    onClick={() => { applyDay(currentDay) }}
                                    onContextMenu={(e) => {
                                        e.preventDefault();
                                        setEvent(currentDay);
                                        setChangeEvent(undefined);
                                    }}
                                >
                                    <p className="month__buttonDate">
                                        {date.day}
                                    </p>

                                    {
                                        eventsFromStore.map((value, index) => {
                                            if (value.date.getFullYear() === currentDay.getFullYear()
                                                && value.date.getMonth() === currentDay.getMonth()
                                                && value.date.getDate() === currentDay.getDate()
                                            ) {
                                                return (
                                                    <button
                                                        type="button"
                                                        className="month__event month__eventButton" key={index}
                                                        onClick={(e) => {editEvent(currentDay, index)}}
                                                    >
                                                        {value.name}
                                                    </button>
                                                )
                                            } else {
                                                return;
                                            }
                                        })
                                    }
                                </div>

                                {
                                    event?.getDate() === currentDay.getDate()
                                        && event?.getMonth() === currentDay.getMonth()
                                        && event?.getFullYear() === currentDay.getFullYear()
                                        ? <Form
                                            closeForm={() => { setEvent(undefined); setChangeEvent(undefined) }}
                                            parentDate={currentDay}
                                            editIndex={changeEvent}
                                        />
                                        : null
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

const storeFuncs = {
    applyDay: funcsFromStore.applyDay
};

const storeData = state => ({
    selectedDay: state.day,
    eventsFromStore: state.events
});

export default connect(storeData, storeFuncs)(Month);