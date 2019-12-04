import React, { Component } from 'react';
import $ from 'jquery';

import { Modal, Button, Row, Col, ListGroup, Form } from 'react-bootstrap';

export default class ServicesModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Empty array for all existing services
      allServices: [],
      // Empty arrays for all service types
      serviceTypes: [],
      // Empty object for selection of existing services to add to trip
      selectedService: {},
      // Empty object for creating a new service
      newService: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddService = this.onAddService.bind(this);
    this.addService = this.addService.bind(this);
  }

  /**
   * Called when the "create new service" form is interacted with (name, destination. location, type or cost changes)
   * @param e - the HTML Element where the change occurs
   */
  onInputChange(e) {
    // Reformat type to include only the id for easier handling
    var value = e.target.value;
    if (e.target.name === 'type' && e.target.value.id) {
      value = value.id;
    }
    // Clear selected service to avoid mistakes
    this.setState({
      selectedService: {},
      newService: { ...this.state.newService, [e.target.name]: value }
    });
    console.log(this.state.selectedService);
    console.log(this.state.newService);
  }

  /**
   * Select existing service to add it to trip (that has not bee assigned to the trip yet)
   * @param service - the selected service
   * @todo Add ability to select multiple services and add them at once
   */
  selectService(service) {
    // Reformat type to include only the id for easier handling
    if (service.type.id) {
      service.type = service.type.id;
    }
    // Clear data for new service to avoid mistakes
    this.setState({
      selectedService: service,
      newService: {}
    });
    console.log(service);
  }

  /**
   * Called when the "Add" button is clicked in the services modal
   * Used to abstract logic to distinguish between creating a new service and using an existing one
   */
  onAddService() {
    // Add service only if all fields are present, otherwise alert for simplicity
    if (
      this.state.newService.name &&
      this.state.newService.location &&
      this.state.newService.type &&
      this.state.newService.cost
    ) {
      console.log('Creating new service!');
      this.addService(this.state.newService);
    } else if (
      this.state.selectedService.name &&
      this.state.selectedService.location &&
      this.state.selectedService.type &&
      this.state.selectedService.cost &&
      this.state.selectedService.id
    ) {
      console.log('Adding existing service!');
      this.addService(this.state.selectedService);
    } else {
      alert('Please check your input or select an existing service!');
    }
  }

  /**
   * Add service to trip in backend
   * @param service the service to associate to the trip
   */
  addService(service) {
    // Initialize form
    let formData = new FormData();

    // Add CSRF to form from cookie
    const csrftoken = document.cookie.split(';')[0].split('csrftoken=')[1];
    formData.set('csrftoken', csrftoken);

    // Add all fields to form (name, location, type(id), cost)
    for (let key in service) {
      formData.set(key, service[key]);
    }
    console.log('Adding new service + ', service);

    // Associate service to trip in backend
    // If the service does not exist, it is created, handled by the backend
    $.ajax({
      url: '/api/trips/' + this.props.trip.id + '/services/add/',
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
        this.getServices();
        this.getServiceTypes();
        this.props.closeModal();
      },
      error: error => {
        console.log('There was an error adding the service - ', error);
      }
    });
  }

  /**
   * Call /api/service-types/ which returns all the available service types (in this case Hotel, Accommodation and Transportation) in JSON format
   */
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

  /**
   * Call /api/services/ which returns all the available services in JSON format
   */
  getServices() {
    $.getJSON({
      url: '/api/services'
    })
      .then(services => {
        console.log(services);
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
                    onChange={e => this.onInputChange(e)}
                    type='text'
                    placeholder='A nice name for the service'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='serviceLocation'>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    onChange={e => this.onInputChange(e)}
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
                    onChange={e => this.onInputChange(e)}
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
                  onChange={e => this.onInputChange(e)}
                  controlId='serviceCost'
                >
                  <Form.Label>Cost</Form.Label>
                  <Form.Control
                    onChange={e => this.onInputChange(e)}
                    name='cost'
                    type='number'
                    placeholder='How much does it cost?'
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
          {/* ------- SELECT SERVICE FROM EXISTING SERVICES LIST ------- */}
          {!(
            this.props.trip.services.length === this.state.allServices.length
          ) ? (
            <Row>
              <Col xs='12'>
                <h5 className='padding margin text-center'>Select a service</h5>
              </Col>

              <Col>
                <ListGroup>
                  {/* Hide services that have already been added to the trip from selection */}
                  {this.state.allServices.map((service, i) =>
                    !this.props.trip.services.find(s => s.id === service.id) ? (
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
          ) : (
            ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.props.closeModal}>
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
