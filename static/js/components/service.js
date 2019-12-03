import PropTypes from 'prop-types';
import React from 'react';

const Service = ({ service }) => {
  return (
    <ul className='list-group align-items-center'>
      <li className='list-group-item'>Service: {service.name}</li>
      <li className='list-group-item'>Type: {service.type}</li>
      <li className='list-group-item'>Location: {service.location}</li>
      <li className='list-group-item'>Cost: ${service.cost}</li>
    </ul>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired
};

export default Service;
