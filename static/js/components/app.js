import React, { Component } from 'react';
import Trip from "./trip"
import $ from 'jquery';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            // create an empty array that will hold the trips
            trips: [],
            categoryMap: new Map()
        }

        this.getTrips = this.getTrips.bind(this);
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
                            updateTrips={this.getTrips}
                        />
                    </div>
                ))}
            </div>
        );
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

            // set the state and update render the view
            this.setState(this.state);
        }).catch(
            (error) => {
                console.error("Error Requesting Trip Data - ", error)
            });
    }
}
