import React, {Component} from 'react';
import Trip from "./trip"
import $ from 'jquery';
// this component is meant to handle all the logic and pass it down to the Trip component
export default class App extends Component{
    constructor(){
        super();
        this.state = {
            // create an empty array that will hold the trips
            trips:[]
        }
        // bind the getTrips function
        this.getTrips = this.getTrips.bind(this);
    }
    componentDidMount(){
        // when component mounts, call the function getTrips
        this.getTrips();
    }
    render(){
        return(
          <div className="container">
              <h1 className="text-center"> Adventure Trips   </h1>
                { this.state.trips.map((trip,i) =>(
                    <div key = {i} className=".col-md-4">
                            <Trip
                            trip = {this.state.trips[i]}/>
                    </div>
                ))}
           </div>
        );
    }
    // getTrips makes an AJAX call to /api/ which returns the trip data in JSON format
    getTrips(){
        $.ajax( {
            url: "/api/",
            method: "GET",
            contentType: "application/json"
            // setState using the response
        } ).then((trips) => this.setState({trips:trips})).catch(
            (error) => {
            console.log(error)
        } )
    }
}