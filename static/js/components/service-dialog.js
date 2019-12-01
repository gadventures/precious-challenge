import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class ServiceDialog extends Component {

    constructor() {
        super();

        // predefine the state variables for the service dialog
        this.state = {
            category: '',
            cost: '',
            location: '',
            serviceName: '',
            service_name_error_text: '',
            location_error_text: '',
            cost_error_text: '',
            category_error_text: ''
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
                            helperText={this.state.service_name_error_text}
                            label="Service Name"></TextField>
                        <TextField
                            value={this.state.location}
                            onChange={this.handleLocationChange}
                            helperText={this.state.location_error_text}
                            label="Location"></TextField>
                        <TextField
                            value={this.state.cost}
                            onChange={this.handleCostChange}
                            helperText={this.state.cost_error_text}
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
                        <FormHelperText>{this.state.category_error_text}</FormHelperText>
                    </form>

                </DialogContent>
                <Button onClick={this.closeFn}>Cancel</Button>
                <Button onClick={this.saveService}>Save</Button>
            </Dialog>
        );
    }

    /**
     * Validate all of the values set in the model. If any value is invalid, tell the user why.
     */
    validateValues(recordedValues) {
        // set up an error list of empty errors
        const errors = {
            category_error_text: '',
            service_name_error_text: '',
            location_error_text: '',
            cost_error_text: ''
        };

        // populate any error text values if the fields are invalid
        if (recordedValues.category === '') {
            errors.category_error_text = 'please select a category';
        }
        if (recordedValues.name.trim() === '') {
            errors.service_name_error_text = 'please enter a service name';
        }
        if (recordedValues.location.trim() === '') {
            errors.location_error_text = 'please enter a location';
        }
        if (recordedValues.cost === '') {
            errors.cost_error_text = 'please enter a cost';
        }
        if (recordedValues.cost < 0) {
            errors.cost_error_text = 'the post must be greater than 0';
        }

        // set the state so that any errors will be displayed to the user
        this.setState(errors);

        // return if any input failed validation
        return Object.keys(errors).filter(key => errors[key] != null) > 0;
    }

    /**
     * Validate then gather the entered values by the user.
     * Call a props function to save the service
     * Pass the service body into the function
     */
    saveServiceFn() {

        // create a body based on the state variables of the dialog
        const body = {
            trip: this.props.trip.id,
            category: this.state.category,
            cost: this.state.cost,
            location: this.state.location,
            name: this.state.serviceName,
        };

        // form validation should happen on the dialog.
        // that should happen before the save occurs and reject the save if validation fails
        const isValid = this.validateValues(body);

        if (isValid) {
            this.props.saveServiceFn(body).then(() => {
                // future: show some success message with a close button
                // for now, close the modal
                this.props.closeFn();
            });
        }
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
            serviceName: '',
            serviceName: '',
            service_name_error_text: '',
            location_error_text: '',
            cost_error_text: '',
            category_error_text: ''
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