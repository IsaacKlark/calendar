import React, { useState } from 'react';
import "./Header.scss";
import search from '../../images/search.png';
import help_center_header from '../../images/help_center_header.png';
import messages_header from '../../images/messages_header.png';
import bells from '../../images/bell_header.png';
import arrow from '../../images/arrow.png';
import person from '../../images/men_header.png';

const Header = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <>
            <div className="header__emitter"></div>
            <header className="header">
                <div className="header__wrapper">
                    <img
                        src={search}
                        className="header__images"
                        alt="serach translations, invoices or help"
                    />
                    <input
                        type="text"
                        value={searchValue}
                        tabIndex="0"
                        className="header__serachInput"
                        onChange={e => { setSearchValue(e.target.value) }}
                        placeholder="Search transactions, invoices or help"
                    />
                </div>

                <div className="header__wrapper">
                    <img
                        src={help_center_header}
                        className="header__helpImage header__images"
                        alt="help center"
                    />
                    <img
                        src={messages_header}
                        className="header__images"
                        alt="messages"
                    />
                    <img
                        src={bells}
                        className="header__bells header__images"
                        alt="bells"
                    />
                    <div className="header__select">
                        <p className="header__personName">
                            John Doe
                </p>
                        <img
                            src={arrow}
                            alt="select person"
                            className="header__arrow"
                        />
                    </div>
                    <img
                        src={person}
                        alt="John Doe"
                        className="header__person"
                    />
                </div>
            </header>
        </>
    );
}

export default Header;