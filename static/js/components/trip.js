import PropTypes from 'prop-types';
import React from 'react';
import Service from './service';

const Trip = ({ trip }) => {
  return (
    <div className='jumbotron'>
      <h5 className='card-title text-center'>
        {trip.travel_style} : {trip.title}
      </h5>
      <ul className='list-group'>
        <li className='list-group-item'>Destination: {trip.destination}</li>
        <li className='list-group-item'>
          Duration: {trip.duration_days}&nbsp;days
        </li>
        <li className='list-group-item'>Base cost: {trip.cost}&nbsp;$</li>
        <li className='list-group-item text-success'>
          <strong>Total cost: {trip.total_cost}&nbsp;$</strong>
        </li>
      </ul>
      <br></br>
      <div className='card'>
        <div className='card-body'>
          <h6 className='card-title text-center'>Services</h6>
          {trip.services.length > 0 ? (
            <table className='table table-bordered'>
             <thead>
             <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Type</th>
                <th>Cost</th>
              </tr>
                           
             </thead>
             <tbody>
             {trip.services.map((service, i) => (
                <Service key={i} service={service} />
              ))}
             </tbody>
            </table>
          ) : (
            <div className='alert'>No services added yet</div>
          )}
          <a href='#' className='btn btn-success'>
            Add services &nbsp; <strong>+</strong>
          </a>
        </div>
      </div>
    </div>
  );
};

Trip.propTypes = {
  trip: PropTypes.object.isRequired
};

export default Trip;
