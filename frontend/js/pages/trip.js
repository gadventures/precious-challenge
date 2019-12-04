import PropTypes from 'prop-types';
import React from 'react';
import TripPreview from '../components/TripPreview';

const Trip = ({ trips }) => {
    return (
        <div className ="home">
        {trips.map((trip) => (
            <TripPreview trip={trip} key={trip.id} />
        ))}
        </div>
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;