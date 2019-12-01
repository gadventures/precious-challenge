import PropTypes from 'prop-types';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
    cell: {
        width: '33%'
    }
};

const Service = ({ service, categoryName }) => {
    return (
        <ListItem>
            <ListItemText style={styles.cell} primary={service.name} secondary={service.location} />
            <ListItemText style={styles.cell} primary="Type" secondary={categoryName} />
            <ListItemText style={styles.cell} primary="Service Cost" secondary={`$ ${service.cost}`} />
        </ListItem>
    )
};

Service.propTypes = {
    service: PropTypes.object.isRequired,
    categoryName: PropTypes.string
};

export default Service;