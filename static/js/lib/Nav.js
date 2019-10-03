import React from 'react';
import classnames from 'classnames';

const Nav = ({ children, tabs }) => {
    return (
        <ul className={classnames('nav', {
            'nav-tabs': tabs
        })}>
            {children}
        </ul>
    )
}

Nav.Item = ({ active, children, ...other }) => {
    return (
        <li className={classnames('nav-item', {
            'active': !!active
        })} {...other}>
            {children}
        </li>
    )
}

Nav.Link = ({ to, children, active }) => {
    return (
        <a to={to} className={classnames('nav-link', {
            'active': !!active
        })}>{children}</a>
    )
}

export default Nav;