import React from 'react';
import "./Aside.scss";
import home from '../../images/home.png';
import dashboards from '../../images/dashboartds.png';
import inbox from '../../images/inbox.png';
import products from '../../images/products.png';
import invoices from '../../images/invoices.png';
import customers from '../../images/customers.png';
import chat_room from '../../images/chat_room.png';
import calendar from '../../images/calendar_inactive.png';
import help_center from '../../images/help_center.png';
import settings from '../../images/settings.png';
import { NavLink } from 'react-router-dom';

const Aside = () => {
    return (
        <aside className="aside">
            <h1 className="aside__mainName">
                impekable
            </h1>
            <nav>
                <ul className="aside__linkList">
                    <li>
                        <NavLink className="aside__navlink" to="/home" activeClassName="aside__activeLink">
                            <img
                                src={home}
                                alt="home"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Home
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/dashboards" activeClassName="aside__activeLink">
                            <img
                                src={dashboards}
                                alt="dashboards"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Dashboards
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/inbox" activeClassName="aside__activeLink">
                            <img
                                src={inbox}
                                alt="Inbox"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Inbox
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/products" activeClassName="aside__activeLink">
                            <img
                                src={products}
                                alt="products"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Products
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/invoices" activeClassName="aside__activeLink">
                            <img
                                src={invoices}
                                alt="products"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Invoices
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/customers" activeClassName="aside__activeLink">
                            <img
                                src={customers}
                                alt="customers"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Customers
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/chat" activeClassName="aside__activeLink">
                            <img
                                src={chat_room}
                                alt="chat room"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Chat room
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/calendar" activeClassName="aside__activeLink">
                            <img
                                src={calendar}
                                alt="calendar"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Calendar
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/help" activeClassName="aside__activeLink">
                            <img
                                src={help_center}
                                alt="help center"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Help center
                            </p>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="aside__navlink" to="/settings" activeClassName="aside__activeLink">
                            <img
                                src={settings}
                                alt="settings"
                                className="aside__image"
                            />
                            <p className="aside__linkName">
                                Settings
                            </p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;