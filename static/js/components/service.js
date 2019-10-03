import React from 'react';
import Card from '../lib/Card';
import PropTypes from 'prop-types';

const Service = ({ service }) => {
    return (
        <div className="service-component m-4">
            <Card>
                <Card.Header>
                    {service.type} : {service.name}
                </Card.Header>
                <Card.Body>
                    <Card.Title> {service.name}</Card.Title>
                    <Card.Text> Location: {service.location} </Card.Text>
                    <Card.Text>
                        <small className="text-muted">
                            Cost: ${service.cost}
                        </small>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

Service.propTypes = {
    service: PropTypes.object.isRequired
}

export default Service;