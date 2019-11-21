import PropTypes from 'prop-types';
import React from 'react';

const Trip = ({ trip }) => {
    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <h4 className="text-center">
                {trip.travel_style} : {trip.title}
            </h4>
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
                Hide the service in case it does not have value.
                The value can be set from the admin panel: 
                http://localhost:8000/admin user: nasko pass: 1234 */}
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
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;