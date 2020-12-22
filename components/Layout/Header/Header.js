import React from 'react';

const Header = (props) => {
    return (
        <nav className={"has-background-primary navbar "}>
            <div id={"navbarBasicExample"} className={"navbar-menu"}>
                <div className="navbar-start">
                    <a className="navbar-item has-text-white-bis">
                        {props.headerTitle}
                     </a>
                </div>
            </div>
        </nav>);
};

export default Header;