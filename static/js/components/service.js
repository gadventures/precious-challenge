import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
    Table,
    Header,
    Button,
    Message,
    Segment,
} from 'semantic-ui-react';
import $ from 'jquery';

class Service extends Component{
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
        this.types = {1: "Hotels", 2: "Accommodations", 3: "Transportation"};
        this.getServices = this.getServices.bind(this);
        this.deleteService = this.deleteService.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableAttached = this.renderTableAttached.bind(this);
    }

    componentDidMount() {
        this.getServices(this.props.trip);
    }

    renderTableAttached() {
        return (
            <Fragment>
                <Button
                    secondary
                    size='tiny'
                >
                    Add Service
                </Button>
            </Fragment>
        )
    };

    renderTableHeader() {
        return (
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Cost</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
        )
    }

    renderTableBody() {
        return (
            this.state.services.length > 0 ?
                this.state.services.map(service => 
                    <Table.Row key={service.id}>
                        <Table.Cell collapsing>
                            {service.name}
                        </Table.Cell>
                        <Table.Cell>
                            {service.location}
                        </Table.Cell>
                        <Table.Cell>
                            {this.types[service.type]}
                        </Table.Cell>
                        <Table.Cell>
                            {`$${service.cost}`}
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                negative
                                size="tiny"
                                onClick={(e) => {
                                    this.deleteService(e, service)
                                }}
                            >
                                Remove
                            </Button>
                        </Table.Cell>
                    </Table.Row>  
                )
            :
            <Table.Row>
                <Table.Cell colSpan="5">
                    <Segment placeholder>
                        <Header icon>
                            No Services Found
                        </Header>
                    </Segment>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        return (
            <Fragment>
                <Message attached="top">
                    {this.renderTableAttached()}
                </Message>
                <Table compact striped celled attached>
                    <Table.Header>
                        {this.renderTableHeader()}
                    </Table.Header>
                    <Table.Body>
                        {this.renderTableBody()}
                    </Table.Body>
                </Table>
            </Fragment>
        )
    }

    deleteService(e, service) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            url: `/api/services/${service.id}`,
            type: "DELETE",
            success: () => {
                this.setState({
                    services: this.state.services.filter(s => s.id != service.id)
                });
            },
            error: (error) => {
                console.log("Oops - ", error);
            }
        });
    }

    getServices(trip) {
        $.getJSON({
            url: "/api/services"
        }).then((services) => {
            services.map(service => {
                if (service.trip === trip.id) {
                    this.setState({
                        services: [...this.state.services, service]
                    });
                }
            })
        }).catch(
            (error) => {
                console.log("Oops - ", error);
            }
        )
    }
}

Service.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Service;