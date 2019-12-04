import React, { Component } from 'react';
import $ from 'jquery';

import {
  Modal,
  Button,
  Row,
  Col,
  ListGroup,
  Form
} from 'react-bootstrap';


export default class ServicesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Empty array for all existing services
      allServices: [],
      // Empty arrays for all service types
      serviceTypes: [],
      selectedService: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onAddService = this.onAddService.bind(this);
    this.addService = this.addService.bind(this);
  }

  // Called when the "create new service" form is interacted with (name, destination. location, type or cost changes)
  handleChange(e) {
    var value = e.target.value;
    if (e.target.name === 'type' && e.target.value.id) {
      value = value.id;
    }
    this.setState({
      selectedService: { ...this.state.selectedService, [e.target.name]: value }
    });
  }

  // Select existing service to add it to trip (that has not bee assigned to the trip yet)
  // Would be nice to be able to add multiple services at once
  selectService(service) {
    if (service.type.id) {
      service.type = service.type.id;
    }
    this.setState({
      selectedService: service
    });
  }

  // Called when the "add" button is clicked in the services modal
  onAddService() {
    // Add service only if all fields are present, otherwise alert for simplicity
    if (
      this.state.selectedService.name &&
      this.state.selectedService.location &&
      this.state.selectedService.type &&
      this.state.selectedService.cost
    ) {
      this.addService(this.state.selectedService);
    } else {
      alert('Please enter all fields to add service!');
    }
  }

  // Add selected or created service to trip
  addService(service) {
    let formData = new FormData();

    // Add CSRF to form from cookie
    const csrftoken = document.cookie.split(';')[0].split('csrftoken=')[1];
    formData.set('csrftoken', csrftoken);

    // Add all fields to form (name, location, type(id), cost)
    for (let key in service) {
      formData.set(key, service[key]);
    }

    // Call method to add service to trip
    // If the service does not exist, it is created and added
    $.ajax({
      url: '/api/trips/' + this.props.trip.id + '/add_service/',
      data: formData,
      processData: false,
      contentType: false,
      beforeSend: function(xhr, settings) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
      },
      type: 'post',
      success: () => {
        // Refresh trip list and close modal
        this.props.getTrips();
        this.props.handleClose();
      },
      error: error => {
        console.log('There was an error adding the service - ', error);
      }
    });
  }
  // Call /api/service-types/ which returns all the available service types (in this case Hotel, Accommodation and Transportation) in JSON format
  getServiceTypes() {
    $.getJSON({
      url: '/api/service-types'
    })
      .then(types => {
        this.setState({ serviceTypes: types });
      })
      .catch(error => {
        console.log('Oops - ', error);
      });
  }
  // Call /api/services/ which returns all the available services in JSON format
  getServices() {
    $.getJSON({
      url: '/api/services'
    })
      .then(services => {
        this.setState({ allServices: services });
      })
      .catch(error => {
        console.log('Oops - ', error);
      });
  }

  componentDidMount() {
    this.getServices();
    this.getServiceTypes();
  }

  render() {
    return (
      <Modal
        size='lg'
        show={this.props.showModal}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{this.props.trip.title}</strong> <br></br>Add a service to
            the trip{' '}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* ------- CREATE NEW SERVICE ------- */}

          <Row>
            <Col>
              <h5 className='padding margin text-center'>
                Create a new service
              </h5>
            </Col>
          </Row>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId='serviceName'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name='name'
                    onChange={e => this.handleChange(e)}
                    type='text'
                    placeholder='A nice name for the service'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='serviceLocation'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    onChange={e => this.handleChange(e)}
                    name='location'
                    type='text'
                    placeholder='Where?'
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='exampleForm.ControlSelect1'>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    placeholder='Select type of service'
                    name='type'
                    as='select'
                    onChange={e => this.handleChange(e)}
                  >
                    {' '}
                    <option>Select service type</option>
                    {this.state.serviceTypes.map((type, i) => (
                      <option key={i} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  onChange={e => this.handleChange(e)}
                  controlId='serviceCost'
                >
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    onChange={e => this.handleChange(e)}
                    name='cost'
                    type='number'
                    placeholder='How much does it cost?'
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {/* ------- SELECT SERVICE FROM EXISTING SERVICES LIST ------- */}
          {!this.props.trip.services.length === this.state.allServices.length ||
          this.props.trip.services.length < 1 ? (
            <Row>
              <Col>
                <h5 className='padding margin text-center'>
                  Select an existing service
                </h5>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <h6 className='padding margin text-center'>
                  All available services have been already added to this trip
                </h6>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <ListGroup>
                {/* Hide services that have already been added to the trip from selection */}
                {this.state.allServices.map((service, i) =>
                  !this.props.trip.services.find(
                    s => s.name === service.name
                  ) ? (
                    <ListGroup.Item
                      active={this.state.selectedService === service}
                      onClick={() => this.selectService(service)}
                      key={i}
                    >
                      {service.name}
                    </ListGroup.Item>
                  ) : (
                    ''
                  )
                )}
              </ListGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={this.onAddService}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
