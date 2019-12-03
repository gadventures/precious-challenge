import $ from 'jquery';
import React, { Component } from 'react';

import Service from './service';
import { Modal, Button, Form, Row, Col, ListGroup } from 'react-bootstrap';

export default class Trip extends Component {
  constructor(trip) {
    super(trip);
    this.state = {
      allServices: [],
      serviceTypes: [],
      showDialog: false,
      selectedService: {},
      form: {}
    };

    this.handleClose = () => this.setState({ showDialog: false });
    this.handleShow = () => this.setState({ showDialog: true });
    this.handleChange = this.handleChange.bind(this);
    this.addService = this.addService.bind(this);
  }

  handleChange(e) {
    // e.preventDefault();
    // e.stopPropagation();

    // if (e.target.name !== 'type') {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value }
    });
    // } else {
    //   const temp = e.target.value.split(',');
    //   const type = {
    //     id: temp[0],
    //     name: temp[1]
    //   };
    //   this.setState({
    //     form: { ...this.state.form, type: type }
    //   });
    // }
  }

  selectService(service) {
    console.log('Selected service: ' + service.name);
    const temp = service.type.id;
    service.type = temp;
    this.setState({
      selectedService: service,
      form: service
    });

    console.log(this.state.form);
  }

  addService() {
    if (
      this.state.form.name &&
      this.state.form.location &&
      this.state.form.type &&
      this.state.form.cost
    ) {
      let formData = new FormData();

      const csrftoken = document.cookie.split(';')[0].split('csrftoken=')[1];

      formData.set('csrftoken', csrftoken);

      if (this.state.allServices.find(s => s.id === this.state.form.id)) {
        for (let key in this.props.trip) {
          console.log(key);
          if (key !== 'services' && key !== 'total_cost') {
            formData.set(key, this.props.trip[key]);
          } else if (key !== 'total_cost') {
            console.log(this.props.trip[key]);
            var trip_services = [];
            this.props.trip.services.map(s => {
              console.log(s.id);
              trip_services.push(s.id);
            });
            trip_services.push(this.state.form.id);
            formData.set('services', trip_services);
          }
        }
      }

      console.log(formData);
      $.ajax({
        url: '/api/trips/' + this.props.trip.id + '/',
        data: formData,
        processData: false,
        headers: {
          Authorization: 'Token ' + csrftoken
        },
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader('X-CSRFToken', csrftoken);
        },
        type: 'put',
        contentType: 'application/json; charset=utf-8',
        success: () => {
          window.location.reload();
        },
        error: error => {
          console.log('Oops - ', error);
        }
      });
    }
  }

  componentDidMount() {
    this.getServices();
    this.getServiceTypes();
  }

  render() {
    return (
      <div className='jumbotron'>
        <h5 className='card-title text-center'>
          {this.props.trip.travel_style} <br></br>{' '}
          <strong>{this.props.trip.title}</strong>
        </h5>
        <ul className='list-group'>
          <li className='list-group-item'>
            Destination: {this.props.trip.destination}
          </li>
          <li className='list-group-item'>
            Duration: {this.props.trip.duration_days}&nbsp;days
          </li>
          <li className='list-group-item'>
            Base cost: {this.props.trip.cost}&nbsp;$
          </li>
          <li className='list-group-item text-success'>
            <strong>Total cost: {this.props.trip.total_cost}&nbsp;$</strong>
          </li>
        </ul>
        <br></br>
        <div className='card'>
          <div className='card-body'>
            <h6 className='card-title text-center'>Services</h6>
            {this.props.trip.services.length > 0 ? (
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.trip.services.map((service, i) => (
                    <Service key={i} service={service} />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='alert'>No services added yet</div>
            )}

            <Button variant='success' onClick={this.handleShow}>
              Add service
            </Button>
          </div>
        </div>

        <Modal show={this.state.showDialog} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a service to the trip</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h5 className='padding margin text-center'>
                  Select and existing service
                </h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <ListGroup>
                  {this.state.allServices.map((service, i) =>
                    !this.props.trip.services.find(s => s.id === service.id) ? (
                      <ListGroup.Item
                        active={this.state.selectedService.id === service.id}
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
            <Row>
              <Col>
                <h5 className='padding margin text-center'>
                  Or create a new service
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
                      placeholder='What?'
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
                      name='type'
                      as='select'
                      onChange={e => this.handleChange(e)}
                    >
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
                      placeholder='How much?'
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant='primary' onClick={this.addService}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
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
}
