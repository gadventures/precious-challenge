import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export default class ServiceDialog extends Component {

    constructor() {
        super();

        // predefine the state variables for the service dialog
        this.state = {
            category: '',
            cost: '',
            location: '',
            serviceName: ''
        }

        // all of these will need to be moved to a seperate controller
        this.handleServiceNameChange = (event) => this.setState({ serviceName: event.target.value });
        this.handleLocationChange = (event) => this.setState({ location: event.target.value });
        this.handleCostChange = (event) => this.setState({ cost: event.target.value });
        this.handleCategoryChange = (event) => this.setState({ category: event.target.value });

        this.closeFn = () => this.closeModalFn();
        this.saveService = () => this.saveServiceFn();
    }

    render() {
        return (
            <Dialog open={this.props.open}>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            value={this.state.serviceName}
                            onChange={this.handleServiceNameChange}
                            label="Service Name"></TextField>
                        <TextField
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            label="Location"></TextField>
                        <TextField
                            value={this.state.cost}
                            onChange={this.handleCostChange}
                            type="number"
                            label="Cost"></TextField>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            onChange={this.handleCategoryChange}
                            value={this.state.category}>
                            {this.props.categoryList.map((category, i) => (
                                <MenuItem key={i} value={category.id}>{category.display_name}</MenuItem>
                            ))}
                        </Select>
                    </form>

                </DialogContent>
                <Button onClick={this.closeFn}>Cancel</Button>
                <Button onClick={this.saveService}>Save</Button>
            </Dialog>
        );
    }

    /**
     * Validate then gather the entered values by the user.
     * Call a props function to save the service
     * Pass the service body into the function
     */
    saveServiceFn() {
        // form validation should happen on the dialog.
        // that should happen before the save occurs and reject the save if validation fails

        // create a body based on the state variables of the dialog
        const body = {
            trip: this.props.trip.id,
            category: this.state.category,
            cost: this.state.cost,
            location: this.state.location,
            name: this.state.serviceName,
        };

        this.props.saveServiceFn(body).then(() => {
            // future: show some success message with a close button
            // for now, close the modal
            this.props.closeFn();
        });
    }

    /**
     * This function will wipe and close the modal
     */
    closeModalFn() {
        // wipe the state of the component
        this.setState({
            category: '',
            cost: '',
            location: '',
            serviceName: ''
        });

        // call the parent close event function
        this.props.closeFn();
    }
}

ServiceDialog.propTypes = {
    open: PropTypes.bool,
    categoryList: PropTypes.array.isRequired,
    closeFn: PropTypes.func.isRequired,
    saveServiceFn: PropTypes.func.isRequired
};