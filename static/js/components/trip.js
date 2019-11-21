import PropTypes from 'prop-types';
import React from 'react';

const Trip = ({trip}) => {
    return (
        <div className="container" style={{maxWidth:'600px'}}>
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
                {/* Check to see if webpack is reacting to changes and the frontend gets the new services from the db*/}
                <li className="list-group-item">
                    Hotel: {trip.hotel}
                </li>
                <li className="list-group-item">
                    Accomodation: {trip.accomodation}
                </li>
                <li className="list-group-item">
                    Transportation: {trip.transportation}
                </li>
            </ul>
         </div>
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
