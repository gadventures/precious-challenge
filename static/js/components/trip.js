import PropTypes from 'prop-types';
import React from 'react';

import Card from '../lib/Card';
import ListGroup from '../lib/ListGroup';
import Button from '../lib/Button';

const Trip = ({ trip }) => {
    return (
        <div className="trip-component">
            <Card>
                <Card.Header>
                    {trip.travel_style} : {trip.title}
                </Card.Header>
                <Card.Image src="https://place-hold.it/300"></Card.Image>
                <Card.Body>
                    <Card.Title> {trip.title}</Card.Title>
                    <Card.Text> Destination: {trip.destination} </Card.Text>
                    <Card.Text>
                        <small className="text-muted">
                            Cost: ${trip.cost}
                        </small>
                    </Card.Text>
                </Card.Body>
                <ListGroup flush>
                    <ListGroup.Item>
                        <div className="row">
                            <div className="col-md-4">
                                <h6>Services</h6>
                            </div>
                            <div className="offset-md-6 col-md-2">
                                <Button variant="primary">Add</Button>
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Selection 1</ListGroup.Item>
                    <ListGroup.Item>Selection 2</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
