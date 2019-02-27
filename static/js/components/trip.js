import React, {Component} from 'react';
// this is a presentational component
export default class Trip extends Component{
    render(){
        return(
        <div className="container" style={{maxWidth:'600px'}}>
            <h4 className="text-center">
                {this.props.trip.travel_style} : {this.props.trip.title}
            </h4>
            <ul className="list-group align-items-center" >
                <li className="list-group-item" >
                    Destination: {this.props.trip.destination}
                </li>
                <li className="list-group-item">
                    Duration: {this.props.trip.duration_days}
                </li>
                <li className="list-group-item">
                    Cost: ${this.props.trip.cost}
                </li>
            </ul>
         </div>
        )
    }
}