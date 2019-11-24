import React, { Component, Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Trip from "./trip";
import $ from 'jquery';

export default class App extends Component{

    constructor() {
        super();
        this.state = {
            trips: []
        }
        this.getTrips = this.getTrips.bind(this);
    }

    componentDidMount() {
        this.getTrips();
    }

    render() {
        return(
            <Fragment>
                <Header as='h1' textAlign='center'>Adventure Trips</Header>
                { this.state.trips.map((trip,i) =>(
                    <div key = {i} className=".col-md-4">
                            <Trip
                                trip = {this.state.trips[i]}
                            />
                    </div>
                ))}
            </Fragment>
        );
    }

    // getTrips makes a call to /api/ which returns the trip data in JSON format
    getTrips() {
        $.getJSON( {
            url: "/api/trips",
        } ).then((trips) => this.setState({trips:trips})).catch(
            (error) => {
            console.log("Oops - ", error)
        } )
    }
}
