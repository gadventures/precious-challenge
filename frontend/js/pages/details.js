import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import TripPreview from '../components/TripPreview';

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
    <TripPreview trip={trip} i={1} />
  );
}
}

export default Details;