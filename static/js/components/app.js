import React, {Component} from 'react';
import Trip from "./trip"
import $ from 'jquery';
import 'semantic-ui-css/semantic.min.css';

export default class App extends Component{

    constructor() {
        super();

        this.state = {
            // create an empty array that will hold the trips
            trips: []
        }

        this.getTrips = this.getTrips.bind(this);
    }

    componentDidMount() {
        this.getTrips();
    }

    render() {
        return(
          <div className="container">
              <h1 className="text-center"> Adventure Trips   </h1>
                { this.state.trips.map((trip,i) =>(
                    <div key = {i} className=".col-md-4">
                            <Trip
                                trip = {this.state.trips[i]}
                            />
                    </div>
                ))}
           </div>
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
