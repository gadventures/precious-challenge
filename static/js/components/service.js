import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

const Service = ({ service, removeService }) => {
  return (
    <tr>
      <td>{service.name}</td>
      <td>{service.location}</td>
      <td>{service.type.name}</td>
      <td>{service.cost}&nbsp;$</td>
      <td ><Button variant="danger"onClick={() => removeService(service.id)}>Delete</Button></td>
    </tr>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired
};

export default Service;
