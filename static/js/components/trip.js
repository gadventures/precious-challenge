import $ from 'jquery';
import React, { Component } from 'react';
import {
  Button,
  ListGroup,
  Table,
  Card,
  Alert,
  Jumbotron
} from 'react-bootstrap';

import Service from './service';
import ServicesModal from './servicesModal';

export default class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.removeService = this.removeService.bind(this);
    // Close services modal
    this.handleClose = () => this.setState({ showModal: false });

    // Show services modal
    this.handleShow = () => this.setState({ showModal: true });
  }

  // Remove selected service from trip
  removeService(id) {
    let formData = new FormData();

    // Add CSRF to form from cookie
    const csrftoken = document.cookie.split(';')[0].split('csrftoken=')[1];
    formData.set('csrftoken', csrftoken);
    formData.set('id', id);

    // Call method to remove service from trip
    $.ajax({
      url: '/api/trips/' + this.props.trip.id + '/remove_service/',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      },
      type: 'post',
      success: () => {
        // Refresh trip list
        this.props.getTrips();
      },
      error: error => {
        console.log('There was an error removing the service - ', error);
      }
    });
  }

  render() {
    return (
      <Jumbotron>
        <h5 className='text-center'>
          {this.props.trip.travel_style} <br></br>
          <strong>{this.props.trip.title}</strong>
        </h5>
        <ListGroup>
          <ListGroup.Item>
            Destination: {this.props.trip.destination}
          </ListGroup.Item>
          <ListGroup.Item>
            Duration: {this.props.trip.duration_days}&nbsp;days
          </ListGroup.Item>
          <ListGroup.Item>
            Base cost: {this.props.trip.cost}&nbsp;$
          </ListGroup.Item>
          <ListGroup.Item variant='success'>
            <strong>Total cost: {this.props.trip.total_cost}&nbsp;$</strong>
          </ListGroup.Item>
        </ListGroup>

        <br></br>
        <Card>
          <Card.Body>
            <Card.Title>Services</Card.Title>
            {this.props.trip.services.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.trip.services.map((service, i) => (
                    <Service
                      key={i}
                      removeService={this.removeService}
                      service={service}
                    />
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant='light'>No services added yet!</Alert>
            )}

            <Button variant='success' onClick={this.handleShow}>
              Add service
            </Button>
          </Card.Body>
        </Card>
        {/* ------- MODAL TO ADD SERVICES TO TRIP ------- */}
        <ServicesModal
          showModal={this.state.showModal}
          getTrips={this.props.getTrips}
          handleClose={this.handleClose}
          trip={this.props.trip}
        ></ServicesModal>
      </Jumbotron>
    );
  }
}
