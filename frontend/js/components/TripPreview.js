import React from 'react';
import { NavLink } from 'react-router-dom';
const TripPreview = ({ trip, i }) => {

    return (
        <div key={i} className=".col-md-4 wrapper">
            <div className="wrapper">
                <NavLink className="trip-entry" to={"/trip/" + trip.id + '/'}>
                    {/* Show the trip's featured image in case there is one */}
                    {trip.imageUrl &&
                        <img src={trip.imageUrl} style={{ width: '100%' }} alt="pic placeholder" />}
                    <h4 className="text-center">
                        {trip.travel_style} : {trip.title}
                    </h4>
                </NavLink>
                <ul className="list-group align-items-center" >
                    <li className="list-group-item" >
                        <strong>Destination:</strong> {trip.destination}
                    </li>
                    <li className="list-group-item">
                        <strong>Duration:</strong> {trip.duration_days}
                    </li>
                    <li className="list-group-item">
                        <strong>Cost:</strong> ${trip.cost}
                    </li>
                    {/* Add the Services fields. Hide the service in case it does not have value. 
                    The value can be set from the admin panel */}
                    {trip.hotels.length > 0 &&
                        <li className="list-group-item">
                            <strong>Hotels:</strong>
                            <ul>{trip.hotels.map(t => <li key={t.id}>{t.name}</li>)}</ul>
                        </li>}
                    {trip.accomodations.length > 0 &&
                        <li className="list-group-item">
                            <strong>Accomodations:</strong> <ul>{trip.accomodations.map(t => <li key={t.id}>{t.name}</li>)}</ul>
                        </li>}
                    {trip.transportations.length > 0 &&
                        <li className="list-group-item">
                            <strong>Transportations:</strong> <ul>{trip.transportations.map(t => <li key={t.id}>{t.name}</li>)}</ul>
                        </li>}
                </ul>
            </div>
        </div>
    )

}
export default TripPreview;