import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom'
import TripPreview from '../components/TripPreview';
import AddHotel from '../components/AddHotel';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null
    }
  }

  componentDidMount() {
    //Stay on top of page when the component is mounted
    window.scrollTo(0, 0)
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

    this.setState({
      trip: trips.length ? trips.find(t => t.id == match.params.id) : null,
    })
  }

  render() {
    const {trip} = this.state;

    if (!trip) {
      return <span className="spinner">Loading ...</span>;
    }

    return (
      <Fragment>
        <TripPreview trip={trip} i={trip.id} />
        <AddHotel trip={trip}/>
      </Fragment>
    );
  }
}

export default Details;