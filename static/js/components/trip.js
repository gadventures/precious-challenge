import PropTypes from 'prop-types';
import React from 'react';

import Card from '../lib/Card';
import ListGroup from '../lib/ListGroup';
import Button from '../lib/Button';
import ServiceAddModal from './serviceAddModal';

class Trip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddServiceModal: false
        }

        this.closeServiceAddModal = this.closeServiceAddModal.bind(this);
        this.openServiceAddModal= this.openServiceAddModal.bind(this);
    }

    openServiceAddModal() {
        this.setState({ showAddServiceModal: true });
    }

    closeServiceAddModal() {
        this.setState({ showAddServiceModal: false })
    }

    render() {
        const { trip, onSubmit, services } = this.props;
        return (
            <React.Fragment>
                <ServiceAddModal
                    show={this.state.showAddServiceModal}
                    onClose={this.closeServiceAddModal}
                    onSubmit={onSubmit}
                    trip={trip}
                    services={services}
                >
                </ServiceAddModal>

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
                                        <Button variant="primary" onClick={this.openServiceAddModal}>Add</Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                            {trip.services.map((s, i) => (
                                <ListGroup.Item key={i}>
                                    <div className="row">
                                        <div className="col-md-4">{s.name}</div>
                                        <div className="col-md-2">Location: {s.location}</div>
                                        <div className="col-md-2">Type: {s.type}</div>
                                        <div className="col-md-2">Cost: ${s.cost}</div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </div>
            </React.Fragment>
        );
    };
}

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
