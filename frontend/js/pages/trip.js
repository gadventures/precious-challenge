import PropTypes from 'prop-types';
import React from 'react';
import TripPreview from '../components/TripPreview';

const Trip = ({ trips }) => {
    return (
        trips.map((trip, i) => (
            <TripPreview trip={trip} i={i} />
        ))
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;