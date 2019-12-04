import React, { Component } from 'react';
import Trip from "./home"
import $ from 'jquery';
import Pages from '.';
export default class App extends Component {

    constructor() {
        super();
        this.state = {
            // create an empty array that will hold the trips
            trips: []
        }

        this.getTrips = this.getTrips.bind(this);
    }

    componentDidMount() {
        //Stay on top of page when the component is mounted
        window.scrollTo(0, 0)
        this.getTrips();
    }

    render() {
        //Render the App component and pass the trips as props to the Pages component
        return (
            <div className="container">
                <h1 className="text-center"> Adventure Trips </h1>
                <Pages
                    trips={this.state.trips}
                />
           </div>
        );
    }

    // getTrips makes a call to /api/ which returns the trip data in JSON format
    getTrips() {
        $.getJSON({
            url: "/api/",
        }).then((trips) => this.setState({ trips: trips })).catch(
            (error) => {
                console.log("Oops - ", error)
            })
    }
}