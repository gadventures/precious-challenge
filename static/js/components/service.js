import PropTypes from 'prop-types';
import React from 'react';

const Service = ({ service }) => {
    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            id: {service.id}
            <br />
            name: {service.name}
            <br />
            location: {service.location}
            <br />
            cost: {service.cost}
            <br />
            category: {service.category}
            <br />
            trip: {service.trip}
        </div>
    )
};

Service.propTypes = {
    service: PropTypes.object.isRequired
};

export default Service;