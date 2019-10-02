import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//TODO(PPavlov): Rename everywhere type to variant
const Button = ({ variant, element, className, children, ...other }) => {
    const components = { button: 'button', input: 'input', Link: Link }
    const Element = components[element] || components.button;

    return (
        <Element className={classnames('btn', className, {
            [`btn-${variant}`]: !!variant
        })} {...other} >
            {children}
        </Element>
    );
}

Button.propTypes = {
    element: PropTypes.oneOf(['button', 'input', 'Link']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

Button.Group = ({ size, vertical, children, className, ...other }) => {
    return (
        <div className={classnames('btn-group', className, {
            ['btn-group-' + size]: !!size,
            'btn-group-vertical': !!vertical
        })}
            {...other}
        >
            {children}
        </div>
    )
}

Button.Toolbar = ({ children, className, ...other }) => {
    return (
        <div className={classnames('btn-toolbar', className)}
            {...other}
        >
            {children}
        </div>
    )
}

export default Button;