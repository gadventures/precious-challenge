import PropTypes from 'prop-types';
import React from 'react';

const Service = ({ service }) => {
  return (
      <tr>
        <td>{service.name}</td>
        <td>{service.location}</td>
        <td>{service.type.name}</td>
        <td>{service.cost}&nbsp;$</td>
      </tr>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired
};

export default Service;
