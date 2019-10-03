import React from 'react';
import Card from '../lib/Card';

const Service = ({ service }) => {
    return (
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
    )
}

export default Service;