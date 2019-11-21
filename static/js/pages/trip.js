import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Trip = ({ trips }) => {

    return (
        trips.map((trip, i) => (
            <div key={i} className=".col-md-4">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <NavLink to={"/trip/" + trip.id + '/'}>
                        {/* Show the trip's featured image in case there is one */}
                        {trip.imageUrl &&
                            <img src={trip.imageUrl} style={{ width: '100%' }} alt="pic placeholder" />}
                        <h4 className="text-center">
                            {trip.travel_style} : {trip.title}
                        </h4>
                    </NavLink>
                    <ul className="list-group align-items-center" >
                        <li className="list-group-item" >
                            Destination: {trip.destination}
                        </li>
                        <li className="list-group-item">
                            Duration: {trip.duration_days}
                        </li>
                        <li className="list-group-item">
                            Cost: ${trip.cost}
                        </li>
                        {/* Add the Services fields.
                Hide the service in case it does not have value
                The value can be set from the admin panel */}
                        {trip.hotel &&
                            <li className="list-group-item">
                                Hotel: {trip.hotel}
                            </li>}
                        {trip.accomodation &&
                            <li className="list-group-item">
                                Accomodation: {trip.accomodation}
                            </li>}
                        {trip.transportation &&
                            <li className="list-group-item">
                                Transportation: {trip.transportation}
                            </li>}
                    </ul>
                </div>
            </div>
        )
        )
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;