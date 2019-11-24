import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
    Form,
    Table,
    Header,
    Button,
    Message,
    Segment,
} from 'semantic-ui-react';
import $ from 'jquery';

import Dialog from './dialog';

class Service extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            services: [],
            form: {},
        }
        this.types = {1: "Hotel", 2: "Accommodation", 3: "Transportation"};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showDialog = this.showDialog.bind(this);
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
                    onClick={(e) => { this.showDialog(e, true)}}
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
                <Dialog 
                    open={this.state.dialog}
                    size="tiny"
                    onClose={(e) => { this.showDialog(e, false)}}
                    header={
                        <Header content='Add Service' />
                    }
                    content={
                        <Form size="large">
                            <Form.Input
                                fluid
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={(e, target) => {
                                    this.onChange(e, target.name, target.value)
                                }}
                                value={this.state.form.name}
                            />
                            <Form.Input
                                fluid
                                type="text"
                                name="location"
                                placeholder="Location"
                                onChange={(e, target) => {
                                    this.onChange(e, target.name, target.value)
                                }}
                                value={this.state.form.location}
                            />
                            <Form.Select
                                fluid
                                options={[
                                    {key: 1, value: 1, text: "Hotel"},
                                    {key: 2, value: 2, text: "Accommodations"},
                                    {key: 3, value: 3, text: "Transportation"},
                                ]}
                                name="type"
                                placeholder="Type"
                                onChange={(e, target) => {
                                    this.onChange(e, target.name, target.value)
                                }}
                                value={this.state.form.type}
                            />
                            <Form.Input
                                fluid
                                type="number"
                                name="cost"
                                placeholder="Cost"
                                onChange={(e, target) => {
                                    this.onChange(e, target.name, target.value)
                                }}
                                value={this.state.form.cost}
                            />
                        </Form>
                    }
                    actions={
                        <Button
                            positive
                            onClick={this.onSubmit}
                        >
                            Submit
                        </Button>
                    }
                />
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

    onChange(e, name, value) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            form: {...this.state.form, [name]: value}
        });
    }

    onSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.form.name && this.state.form.location && this.state.form.type && this.state.form.cost) {
            this.createService(this.state.form);
        }
    }

    showDialog(e, value) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dialog:value, form:{}});
    }

    createService(form) {
        // Create form data from json data stored in state
        let formData = new FormData();
        console.log(this.props.trip.id, form)
        formData.append("trip", this.props.trip.id);
        for (let key in form) {
            formData.append(key, form[key]);
        }
        console.log(formData);
        $.ajax({
            url: "/api/services",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: () => {
                window.location.reload()
            },
            error: (error) => {
                console.log("Oops - ", error);
            }
        });
    }

    deleteService(e, service) {
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            url: `/api/services/${service.id}`,
            type: "DELETE",
            success: () => {
                window.location.reload()
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