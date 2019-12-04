import React, { Component } from 'react';
import Trip from './trip';
import $ from 'jquery';

import ServicesModal from './servicesModal';
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      // Create an empty array that will hold the trips
      trips: [],
      // Initialize trip object to avoid errors
      currentTrip: {
        title: '',
        destination: '',
        cost: '',
        total_cost: '',
        services: []
      },
      showModal: false
    };

    // Bindings
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getTrips = this.getTrips.bind(this);
    this.removeService = this.removeService.bind(this);
  }

  componentDidMount() {
    this.getTrips();
  }

  /**
   * Remove a service from a particular trip in backend
   * @param tripID - the trip id in the backend
   * @param serviceID - the service id in the backend
   */
  removeService(tripID, serviceID) {
    // Initialize form
    let formData = new FormData();

    // Add CSRF to form from cookie
    const csrftoken = document.cookie.split(';')[0].split('csrftoken=')[1];
    formData.set('csrftoken', csrftoken);
    formData.set('id', serviceID);

    // Call method to remove service from trip
    $.ajax({
      url: '/api/trips/' + tripID + '/services/remove/',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      },
      type: 'post',
      success: () => {
        // Refresh trip list
        this.getTrips();
      },
      error: error => {
        console.log('There was an error removing the service - ', error);
      }
    });
  }

  /**
   * Open modal to add services to trip
   * @param trip - the trip to open the modal for
   */
  openModal(trip) {
    this.setState({
      currentTrip: trip,
      showModal: true
    });
  }

  /**
   * Close the trip services modal
   */
  closeModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'> Adventure Trips </h1>
        <div className='row'>
          {this.state.trips.map((trip, i) => (
            <div key={i} className='col-12'>
              <Trip
                removeService={this.removeService}
                openModal={this.openModal}
                closeModal={this.closeModal}
                getTrips={this.getTrips}
                trip={this.state.trips[i]}
              />
            </div>
          ))}
        </div>
        {/* ------- A MODAL TO ADD SERVICES TO TRIP ------- */}
        <ServicesModal
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          getTrips={this.getTrips}
          trip={this.state.currentTrip}
        ></ServicesModal>
      </div>
    );
  }

  /**
   * Call /api/trips which returns the trip data in JSON format
   */
  getTrips() {
    $.getJSON({
      url: '/api/trips'
    })
      .then(trips => this.setState({ trips: trips }))
      .catch(error => {
        console.log('There was an error fetching trips - ', error);
      });
  }
}
