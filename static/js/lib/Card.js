import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const components = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6' }

const Card = ({ children, className, ...other }) => {
    return (
        <div className={classnames('card', className)} {...other}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    other: PropTypes.any
}

Card.Image = ({ src, className, ...other }) => {
    return (
        <img src={src} className={classnames("card-img-top", className)}  {...other}>
        </img>
    )
}

Card.Body = ({ children, className, ...other }) => {
    return (
        <div className={classnames("card-body", className)}  {...other}>
            {children}
        </div>
    )
}

Card.Header = ({ children, className, element, ...other }) => {
    const _components = Object.assign(components, { div: 'div' })
    const Element = _components[element] || _components.div;

    return (
        <Element className={classnames("card-header", className)} {...other}>
            {children}
        </Element>
    )
}

Card.Footer = ({ children, className, ...other }) => {
    return (
        <div className={classnames("card-footer", className)} {...other}>
            {children}
        </div>
    )
}

Card.Footer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    other: PropTypes.any
}

Card.Title = ({ element, children, className, ...other }) => {
    const Element = components[element] || components.h5;

    return (
        <Element className={classnames("card-title", className)}  {...other}>
            {children}
        </Element>
    )
}

Card.Subtitle = ({ element, children, className, ...other }) => {
    const Element = components[element] || components.h6;

    return (
        <Element className={classnames("card-subtitle", className)} {...other}>
            {children}
        </Element>
    )
}

Card.Link = ({ to, children, className, ...other }) => {
    return (
        <Link to={to} className={classnames('card-link', className)} {...other}>
            {children}
        </Link>
    )
}

Card.Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    to: PropTypes.string,
    other: PropTypes.any
}

Card.Text = ({ children, className, ...other }) => {
    return (
        <p className={classnames("card-text", className)} {...other}>
            {children}
        </p>
    )
}

Card.Text.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    other: PropTypes.any
}

export default Card;