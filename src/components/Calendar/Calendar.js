import React from 'react';
import './Calendar.scss';
import { NavLink } from 'react-router-dom';

const Calendar = (props) => {

    return (
        <main className="calendar">
            <h2 className="calendar__header">
                Calendar
            </h2>
            <section className="calendar__mainWrapper">
                <div className="calendar__mainWrapperHeaderWrapper">
                    <h3 className="calendar__mainWrapperHeader">
                        Calendar view
                    </h3>
                    <ul className="calendar__linksList">
                        <li>
                            <NavLink
                                to="/calendar/month"
                                className="calendar__link"
                                activeClassName="calendar__activeLink"
                            >
                                Month
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar/week"
                                className="calendar__link"
                                activeClassName="calendar__activeLink"
                            >
                                Week
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar/day"
                                className="calendar__link"
                                activeClassName="calendar__activeLink"
                            >
                                Day
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/calendar/agenda"
                                className="calendar__link"
                                activeClassName="calendar__activeLink"
                            >
                                Agenda
                            </NavLink>
                        </li>
                    </ul>
                </div>
             
                {props.children}
            </section>
        </main>
    )
}

export default Calendar;