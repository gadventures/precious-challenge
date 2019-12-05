import React, { Fragment, Component } from 'react'

export class TotalCostCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: this.props.trip,
            initialTripCost: this.props.trip.cost,
            totalTripCost: 0,
        };
    }

    countTotal() {
        const { trip, initialTripCost } = this.state;
        // Calculate the total price for all hotels to a given trip
        const totalHotelCost = trip.hotels.reduce((acc, item) => {
            return acc + item.cost;
        }, 0);
        // Calculate the total price for all accomodations to a given trip
        const totalAccCost = trip.accomodations.reduce((acc, item) => {
            return acc + item.cost;
        }, 0);
        // Calculate the total price for all transportations to a given trip
        const totalTrCost = trip.transportations.reduce((acc, item) => {
            return acc + item.cost;
        }, 0)
        //Return the total price
        return totalHotelCost + totalTrCost + totalAccCost + initialTripCost;
    }

    render() {
        return (
        <Fragment>
            {this.countTotal()}
        </Fragment>
        );
    }
}