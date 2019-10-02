import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListGroup = ({ flush, horizontal, horizontalSize, children, className, ...other }) => {
    return (
        <ul className={classnames("list-group", className, {
            'list-group-flush': !!flush,
            'list-group-horizontal': !!horizontal,
            [`list-group-horizontal-${horizontalSize}`]: !!horizontalSize
        })} {...other}>
            {children}
        </ul>
    )
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    horizontal: PropTypes.bool,
    horizontalSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    other: PropTypes.any
}

ListGroup.Item = ({ action, variant, children, className, ...other }) => {
    return (
        <li className={classnames("list-group-item", className, {
                'list-group-item-action': !!action,
                [`list-group-item-${variant}`]: !!variant
            })} {...other}>
            {children}
        </li>
    )
}

ListGroup.Item.propTypes = {
    action: PropTypes.bool,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    other: PropTypes.any
}

export default ListGroup;