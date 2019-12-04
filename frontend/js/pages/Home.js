import React from 'react';
import TripPreview from '../components/TripPreview';

const Trip = ({trips}) => {
    return (
        <div className ="home-wrapper">
        {trips.map((trip) => (
            <TripPreview trip={trip} key={trip.id} />
        ))}
        </div>
    )
};

export default Trip;