import React, { Component, Fragment } from 'react';
import TripPreview from '../components/TripPreview';
import AddHotel from '../components/AddHotel';
import AddAccomodation from '../components/AddAccomodation';
import AddTransportation from '../components/AddTransportation';
import ToggleBox from '../components/ToggleBox';
import styles from './details.module.css'
class Details extends Component {
  constructor() {
    super();
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
      <div className={styles.wrapper}>
        <TripPreview trip={trip} i={trip.id} />
        <ToggleBox title="Add Hotel Service">
				   <AddHotel trip={trip}/>
			</ToggleBox>
      <ToggleBox title="Add Accomodation Service">
				   <AddAccomodation trip={trip}/>
			</ToggleBox>
      <ToggleBox title="Add transportation Service">
				   <AddTransportation trip={trip}/>
			</ToggleBox>
      </div>
    );
  }
}

export default Details;