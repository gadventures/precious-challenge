import PropTypes from 'prop-types';
import React from 'react';
import Service from './service';

const Trip = ({ trip }) => {
  return (
    <div className='container' style={{ maxWidth: '600px' }}>
      <h4 className='text-center'>
        {trip.travel_style} : {trip.title}
      </h4>
      <ul className='list-group align-items-center'>
        <li className='list-group-item'>Destination: {trip.destination}</li>
        <li className='list-group-item'>Duration: {trip.duration_days}</li>
        <li className='list-group-item'>Base cost: ${trip.cost}</li>
        <li className='list-group-item'>Total cost: ${trip.total_cost}</li>
      </ul>
      <h6 className='text-center'>Services</h6>
      <ul className='list-group align-items-center'>
        {trip.services.map((service, i) => (
          <Service service={service} />
        ))}
      </ul>
    </div>
  );
};

Trip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default Trip;
