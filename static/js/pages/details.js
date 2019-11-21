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
            Destination: {trip.destination}
          </li>
          <li className="list-group-item">
            Duration: {trip.duration_days}
          </li>
          <li className="list-group-item">
            Cost: ${trip.cost}
          </li>
          <li className="list-group-item">
            Hotel: {trip.hotel}
          </li>
          <li className="list-group-item">
            Accomodation: {trip.accomodation}
          </li>
          <li className="list-group-item">
            Transportation: {trip.transportation}
          </li>
        </ul>
      </div>

    );
  }
}

export default Details;