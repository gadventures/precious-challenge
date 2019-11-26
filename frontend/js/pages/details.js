import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null
    }
  }


  componentDidMount() {
    const { trips, match } = this.props;

    this.setState({
      trip: trips.length ? trips.find(t => t.id == match.params.id) : null,
    })
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) === JSON.stringify(this.props)) {
      return
    }
    const { trips, match } = this.props;
    console.log(trips);

    this.setState({
      trip: trips.length ? trips.find(t => t.id == match.params.id) : null,
    })
  }

render() {
  const { trip } = this.state;

  if (!trip) {
    return <span className="spinner">Loading ...</span>;
  }

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <NavLink to={"/trip/" + trip.id}>
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
        <li className="list-group-item">
          <strong>Hotel:</strong> {trip.hotel}
        </li>
        <li className="list-group-item">
          <strong>Accomodation:</strong>{trip.accomodation}
        </li>
        <li className="list-group-item">
          <strong>Transportation:</strong> {trip.transportation}
        </li>
      </ul>
    </div>

  );
}
}

export default Details;