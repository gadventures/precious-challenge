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
import DialogActions from '@material-ui/core/DialogActions';

const styles = {
    modalRow: {
        height: '65px',
        minWidth: '250px'
    },
    modalLeft: {
        float: 'left',
        width: '45%',
        bottom: '0px'
    },
    modalRight: {
        float: 'right',
        width: '45%',
        bottom: '0px'
    },
    inputField: {
        width: '100%'
    }
}

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
            category_error_text: '',
            validation_error_text: ''
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
                    <form autoComplete="off">
                        <div style={styles.modalRow}>
                            <TextField
                                style={styles.modalLeft}
                                value={this.state.serviceName}
                                onChange={this.handleServiceNameChange}
                                helperText={this.state.service_name_error_text}
                                label="Service Name"></TextField>
                            <div style={styles.modalRight}>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    style={styles.inputField}
                                    labelId="category-label"
                                    id="category-select"
                                    onChange={this.handleCategoryChange}
                                    value={this.state.category}>
                                    {this.props.categoryList.map((category, i) => (
                                        <MenuItem key={i} value={category.id}>{category.display_name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{this.state.category_error_text}</FormHelperText>
                            </div>
                        </div>
                        <div style={styles.modalRow}>
                            <TextField
                                style={styles.modalLeft}
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                                helperText={this.state.location_error_text}
                                label="Location"></TextField>
                            <TextField
                                style={styles.modalRight}
                                value={this.state.cost}
                                onChange={this.handleCostChange}
                                helperText={this.state.cost_error_text}
                                type="number"
                                label="Cost"></TextField>
                        </div>
                    </form>
                    <h5>{this.state.validation_error_text}</h5>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeFn}>Cancel</Button>
                    <Button onClick={this.saveService}>Save</Button>
                </DialogActions>
            </Dialog>
        );
    }

    /**
     * Wipe the state of the model
     */
    wipeStateValues() {
        // wipe the state of the component
        this.setState({
            category: '',
            cost: '',
            location: '',
            serviceName: '',
            service_name_error_text: '',
            location_error_text: '',
            cost_error_text: '',
            category_error_text: '',
            validation_error_text: ''
        });
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
        errors.category_error_text = recordedValues.category === '' ? 'please select a category' : '';
        errors.service_name_error_text = recordedValues.name.trim() === '' ? 'please enter a service name' : '';
        errors.location_error_text = recordedValues.location.trim() === '' ? 'please enter a location' : '';

        // validate the cost which was entered. Some value greater than 0 is required.
        if (recordedValues.cost === '') {
            errors.cost_error_text = 'please enter a cost';
        } else if (recordedValues.cost < 0) {
            errors.cost_error_text = 'the cost must be greater than 0';
        }

        // the form will be valid when no errors were reported during the validation process
        let isValid = Object.keys(errors).filter(key => errors[key] != '').length === 0;

        // if the form was invalid, warn the user
        errors.validation_error_text = !isValid ? 'Validation failed for the service. Please check each value and try again.' : null;

        // set the state so that any errors will be displayed to the user
        this.setState(errors);

        // return if any input failed validation
        return isValid;
    }

    /**
     * Validate then gather the entered values by the user.
     * Call a props function to save the service
     * Pass the service body into the function
     */
    saveServiceFn() {

        // create a body based on the state variables of the dialog
        const newService = {
            trip: this.props.trip.id,
            category: this.state.category,
            cost: this.state.cost,
            location: this.state.location,
            name: this.state.serviceName,
        };

        // form validation should happen on the dialog.
        // that should happen before the save occurs and reject the save if validation fails
        const isValid = this.validateValues(newService);

        if (isValid) {
            this.props.saveServiceFn(this.props.trip, newService).then(() => {
                // wipe the state values which manage the input values
                this.wipeStateValues();
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
        // wipe the state values which manage the input values
        this.wipeStateValues();

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