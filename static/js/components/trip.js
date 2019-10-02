import PropTypes from 'prop-types';
import React from 'react';

const Trip = ({ trip }) => {
    return (
        <div className="trip">
            <div className="card-deck">
                <div className="card">
                    <img src="https://place-hold.it/300" className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{trip.travel_style} : {trip.title}</h5>
                        <p className="card-text">Destination: {trip.destination}</p>
                        <p className="card-text"><small className="text-muted">Cost: ${trip.cost}</small></p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Services</h6>
                                </div>
                                <div className="offset-md-2 col-md-4">
                                    <button className="btn btn-primary">Add</button>
                                </div>
                            </div>

                        </li>
                        <li className="list-group-item">
                            Display service here
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
