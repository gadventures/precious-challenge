import React from 'react';
import TripPreview from '../components/TripPreview';

const Trip = ({trips}) => {
    return (
        <div className ="home-wrapper">
            <h2 className="text-center list-heading">Latest Trips</h2>
        {trips.map((trip) => (
            <TripPreview trip={trip} key={trip.id} />
        ))}
        </div>
    )
};

export default Trip;