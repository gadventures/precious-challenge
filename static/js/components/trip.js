import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Service from "./service"
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

export default class Trip extends Component {
    constructor() {
        super();
        this.state = { showServices: false };
        this.getServiceCategoryDisplayName = (service) => this.getServiceCategoryDisplayNameFn(service);
    }

    render() {
        let cardActions = null;
        if (this.state.showServices) {
            cardActions = <CardActions>
                <Button onClick={() => this.setState({ showServices: false })} size="small">Hide Services</Button>
            </CardActions>
        } else {
            cardActions = <CardActions>
                <Button onClick={() => this.setState({ showServices: true })} size="small">Show Services</Button>
            </CardActions>
        }

        let services = null;
        if (this.state.showServices) {

            services = <List>
                {this.props.trip.services.map((service, index) => (
                    <div
                        key={index}>
                        <Service
                            service={service}
                            categoryName={this.getServiceCategoryDisplayName(service)}
                        />
                        <Divider />
                    </div>
                ))}
            </List>
        }

        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <Card style={{ marginTop: '5px' }}>
                    <CardContent>
                        <Typography variant="h5" component="h5">
                            {this.props.trip.travel_style} : {this.props.trip.title}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.props.trip.destination} - {this.props.trip.duration_days} days
                    </Typography>
                        <Typography variant="body2" component="p">
                            Initial Cost - ${this.props.trip.cost}
                        </Typography>
                        <Typography variant="body2" component="p">
                            Sale Price - ${this.props.trip.sale_price}
                        </Typography>

                        <Typography color="textSecondary">
                            {this.props.trip.services.length} Services
                            <Button onClick={() => this.props.addNewService(this.props.trip)}>Add New Service</Button>
                        </Typography>

                        {services}
                    </CardContent>
                    {cardActions}
                </Card>
            </div >
        )
    }

    /**
     * Get the category display name from the given category id and category map
     * @param {*} service the service with some selected categoryid
     */
    getServiceCategoryDisplayNameFn(service) {
        return this.props.categoryMap.get(service.category).display_name;
    }
};

Trip.propTypes = {
    trip: PropTypes.object.isRequired,
    categoryMap: PropTypes.object,
    addNewService: PropTypes.func
};