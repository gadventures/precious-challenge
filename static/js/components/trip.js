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

export default class Trip extends Component {
  constructor(props) {
    super(props);
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
                      tripID={this.props.trip.id}
                      key={i}
                      removeService={this.props.removeService}
                      service={service}
                    />
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert variant='light'>No services added yet!</Alert>
            )}

            <Button
              variant='success'
              onClick={() => this.props.openModal(this.props.trip)}
            >
              Add service
            </Button>
          </Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}
