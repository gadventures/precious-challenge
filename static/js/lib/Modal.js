import React from 'react';
import classnames from 'classnames';
import Button from './Button';

const Modal = ({ children, fade, show, ...other }) => {
    const conditionals = {
        'fade': !!fade,
        'show': !!show
    };
    return (
        !!show ? <React.Fragment>
            <div className={classnames('modal-backdrop', conditionals)}></div>
            <div className={classnames('modal', conditionals)} style={{ display: 'block' }} {...other}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </React.Fragment> : null
    )
}

Modal.Header = ({ children, onClose }) => {
    return (
        <div className="modal-header">
            <h5 className="modal-title">
                {children}
            </h5>
            <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
            </button>
        </div>
    )
}

Modal.Body = ({ children }) => {
    return (
        <div className="modal-body">
            {children}
        </div>
    )
}

Modal.Footer = ({ onClose, onSubmit }) => {
    return (
        <div className="modal-footer">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" type="submit" onClick={onSubmit}>Submit</Button>
        </div>
    )
}

export default Modal;