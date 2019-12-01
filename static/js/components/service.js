import PropTypes from 'prop-types';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Service = ({ service, categoryName }) => {
    return (
        <ListItem>
            <ListItemText style={{ width: '33%' }} primary={service.name} secondary={service.location} />
            <ListItemText style={{ width: '33%' }} primary="Type" secondary={categoryName} />
            <ListItemText style={{ width: '33%' }} primary="Service Cost" secondary={`$ ${service.cost}`} />
        </ListItem>
    )
};

Service.propTypes = {
    service: PropTypes.object.isRequired,
    categoryName: PropTypes.string
};

export default Service;