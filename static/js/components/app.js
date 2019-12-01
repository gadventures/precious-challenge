import React, { Component } from 'react';
import $ from 'jquery';
import Trip from "./trip"
import ServiceDialog from "./service-dialog";
import Divider from '@material-ui/core/Divider';

const styles = {
    noMargin: {
        paddingLeft: '0px',
        paddingRight: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        width: '100%',
    }
};

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            // create an empty array that will hold the trips
            trips: [],
            categoryMap: new Map(),
            categoryList: [],
            serviceDialogOpen: false,
            trip: null
        }

        this.getTrips = this.getTrips.bind(this);
        this.addNewService = this.addNewService.bind(this);
        this.closeNewServiceModal = this.closeNewServiceModal.bind(this);

        this.saveNewService = (parameter) => this.saveNewServiceFn(parameter);
    }

    render() {
        return (
            <div className="container" style={styles.noMargin} >
                <section className="text-center">
                    <h1>Adventure Trips</h1>
                    <Divider style={styles.noMargin} />
                </section>
                {
                    this.state.trips.map((trip, i) => (
                        <div key={i} className=".col-md-4">
                            <Trip
                                trip={this.state.trips[i]}
                                addNewService={this.addNewService}
                                categoryMap={this.state.categoryMap}
                            />
                        </div>
                    ))
                }

                <ServiceDialog
                    open={this.state.serviceDialogOpen}
                    categoryList={this.state.categoryList}
                    trip={this.state.trip}
                    closeFn={this.closeNewServiceModal}
                    saveServiceFn={this.saveNewService} />
            </div>
        );
    }

    componentDidMount() {
        this.getTrips();
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
        this.setState({
            trip: null,
            serviceDialogOpen: false
        });
    }

    /**
     * Validate and save the new item to the dataservice
     */
    saveNewServiceFn(body) {
        // post the new service to the services endpoint
        const postSevice = $.post('/api/services', JSON.stringify(body), 'json');
        postSevice.then((postResponses) => {
            // update the ui with the new service
        }, (error) => {
            // echo the event to console
            console.error(error);
        });

        // return the promise for the modal to update its ui based on when the promise resolves
        return postSevice;
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
        }, (error) => {
            console.error("Error Requesting Trip Data - ", error)
        });
    }
}
