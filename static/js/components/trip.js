import React from 'react';
import PropTypes from 'prop-types';
import Service from "./service"

const Trip = ({ trip, addNewService }) => {
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
                    Initial Cost: ${trip.cost}
                </li>
                <li className="list-group-item">
                    Sale Price: ${trip.sale_price}
                </li>
            </ul>
            {
                trip.services.map((service, i) => (
                    <div key={i} className=".col-md-4">
                        <Service
                            service={service}
                        />
                    </div>
                ))
            }
            <button onClick={() => addNewService(trip)}>Add New Service</button>
        </div>
    )
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
