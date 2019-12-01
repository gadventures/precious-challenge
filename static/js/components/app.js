import React, { Component } from 'react';
import { Dialog, Button } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';
import Trip from "./trip"

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            // create an empty array that will hold the trips
            trips: [],
            categoryMap: new Map(),
            categoryList: [],
            serviceDialogOpen: false,
            // these will need to be moved to a new component that handles its own state
            trip: null,
            category: '',
            cost: 0,
            location: '',
            serviceName: ''
        }

        this.getTrips = this.getTrips.bind(this);
        this.addNewService = this.addNewService.bind(this);
        this.closeNewServiceModal = this.closeNewServiceModal.bind(this);
        this.saveNewService = this.saveNewService.bind(this);

        // all of these will need to be moved to a seperate controller
        this.handleServiceNameChange = this.handleServiceNameChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleCostChange = this.handleCostChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleServiceNameChange(event) {
        this.setState({ serviceName: event.target.value });
    }

    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }

    handleCostChange(event) {
        this.setState({ cost: event.target.value });

    }

    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
    }

    componentDidMount() {
        this.getTrips();
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center"> Adventure Trips   </h1>
                {this.state.trips.map((trip, i) => (
                    <div key={i} className=".col-md-4">
                        <Trip
                            trip={this.state.trips[i]}
                            addNewService={this.addNewService}
                        />
                    </div>
                ))}
                <Dialog open={this.state.serviceDialogOpen}>
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
                                {this.state.categoryList.map((category, i) => (
                                    <MenuItem key={i} value={category.id}>{category.display_name}</MenuItem>
                                ))}
                            </Select>
                        </form>

                    </DialogContent>
                    <Button onClick={this.closeNewServiceModal}>Cancel</Button>
                    <Button onClick={this.saveNewService}>Save</Button>
                </Dialog>
            </div>
        );
    }

    /**
     * Allow the user to add a new service by displaying some dialog for user input.
     */
    addNewService(trip) {
        this.setState({
            trip: trip,
            serviceDialogOpen: true
        });
    }

    closeNewServiceModal() {
        this.setState({ serviceDialogOpen: false });
    }

    /**
     * Validate and save the new item to the dataservice
     */
    saveNewService() {
        // form validation should happen on the dialog.
        // that should happen before the save occurs and reject the save if validation fails

        // create a body based on the state variables of the dialog
        const body = {
            trip: this.state.trip.id,
            category: this.state.category,
            cost: this.state.cost,
            location: this.state.location,
            name: this.state.serviceName,
        };

        // post the new service to the services endpoint
        $.post('/api/services', JSON.stringify(body), 'json').then((postResponses) => {
            // show some success message here

            // close the dialog
            this.closeNewServiceModal();
        }, (error) => {
            // show some error message here

            console.error(error);
            // close the dialog
            this.closeNewServiceModal();
        });
    }

    /** 
     * getTrips makes a call to /api/ which returns the trip data in JSON format
     */
    getTrips() {
        const getTripDataPromises = [];
        // first query for all trips
        getTripDataPromises.push($.getJSON({ url: "/api/trips" }));
        // I'm getting the categories seperately
        getTripDataPromises.push($.getJSON({ url: "/api/categories" }));

        Promise.all(getTripDataPromises).then((queryResponses) => {
            // update the trips
            this.state.trips = queryResponses[0];

            // create a map for the categories instead of using an array 
            // I don't want to loop to search for a category by id
            const categoryMap = new Map();

            // loop through the categories and assign each record to a map with id as the key
            queryResponses[1].map((currentCategory) => {
                // store the reference to the full category. 
                // We may have more properties than just 'display_name' in the future.
                // this is really just future proofing, I could have pused the string instead.
                categoryMap.set(currentCategory.id, currentCategory);
            });

            // keep a reference to the categorymap in the state
            this.state.categoryMap = categoryMap;
            this.state.categoryList = queryResponses[1];

            // set the state and update render the view
            this.setState(this.state);
        }).catch(
            (error) => {
                console.error("Error Requesting Trip Data - ", error)
            });
    }
}
