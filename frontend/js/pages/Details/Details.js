import React, { Component, Fragment } from 'react';
import TripPreview from '../../components/TripPreview';
import AddHotel from '../../components/AddHotel';
import AddAccomodation from '../../components/AddAccomodation';
import AddTransportation from '../../components/AddTransportation';
import ToggleForm from '../../components/ToggleForm';
import styles from './Details.module.css'
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
      return <span className="text-center">Loading ...</span>;
    }

    return (
      <div className={styles.wrapper}>
        <TripPreview trip={trip} i={trip.id} />
        <ToggleForm title="Add Hotel">
				   <AddHotel trip={trip}/>
			</ToggleForm>
      <ToggleForm title="Add Accomodation">
				   <AddAccomodation trip={trip}/>
			</ToggleForm>
      <ToggleForm title="Add Transportation">
				   <AddTransportation trip={trip}/>
			</ToggleForm>
      </div>
    );
  }
}

export default Details;