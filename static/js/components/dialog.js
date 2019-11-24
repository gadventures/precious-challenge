import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

const Dialog = (props) => {
    return (
        <Modal
            open={props.open}
            size={props.size}
            onClose={props.onClose}
        >
            {props.header}
            <Modal.Content>
                {props.content}
            </Modal.Content>
            <Modal.Actions>
                {props.actions}
            </Modal.Actions>
        </Modal>
    )
};

Dialog.propTypes = {
    size: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    header: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

export default Dialog;