import PropTypes from 'prop-types';
import React from 'react';
import TripPreview from '../components/TripPreview';

const Trip = ({ trips }) => {
    return (
        trips.map((trip) => (
            <TripPreview trip={trip} key={trip.id} />
        ))
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;