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

const styles = {
    container: {
        maxWidth: '600px'
    },
    card: {
        marginTop: '5px'
    }
};

export default class Trip extends Component {
    constructor() {
        super();
        this.state = { showServices: false };
        this.getServiceCategoryDisplayName = (service) => this.getServiceCategoryDisplayNameFn(service);
        this.openNewServiceDialogFn = () => this.props.openNewServiceDialogFn(this.props.trip)
    }

    render() {
        return (
            <div className="container" style={styles.container}>
                <Card style={styles.card}>
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
                            <Button onClick={this.openNewServiceDialogFn}>Add New Service</Button>
                        </Typography>

                        {this.state.showServices ?
                            <List>
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
                            </List> : null
                        }
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => this.setState({ showServices: !this.state.showServices })} size="small">
                            {this.state.showServices ? 'Hide Services' : 'Show Services'}
                        </Button>
                    </CardActions>
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
    openNewServiceDialogFn: PropTypes.func
};