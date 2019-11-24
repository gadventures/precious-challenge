import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
    Table,
    Header,
    Button,
    Message,
    Segment,
} from 'semantic-ui-react';

class Service extends Component{
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
        this.renderTableBody = this.renderTableBody.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableAttached = this.renderTableAttached.bind(this);
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
            <Table.Row>
                <Table.Cell colSpan='5'>
                    { this.state.services > 0 ?
                        <Fragment />
                    :
                        <Segment placeholder>
                            <Header icon>
                                No Services Found
                            </Header>
                        </Segment>
                    }
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
}

Service.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Service;