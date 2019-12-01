import PropTypes from 'prop-types';
import React from 'react';

const Service = ({ service, categoryName }) => {
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
        </div>
    )
};

Service.propTypes = {
    service: PropTypes.object.isRequired,
    categoryName: PropTypes.string
};

export default Service;