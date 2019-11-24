import PropTypes from 'prop-types';
import React from 'react';

import Service from './service';

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
                <Service trip={trip}/>
            </ul>
         </div>
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
