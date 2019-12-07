import React, { Component } from "react";
import Trip from "./trip";
import Cart from "./cart";
import $ from "jquery";
import "../../css/styles.scss";
import AdditionalWindows from "./AdditionalWindows";
import { message } from 'antd';
import axios from 'axios';

var selectedTime = [];

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            trips: [],
            Cart: [],
            current: 0, // for keeping track of the steps on the additional window
            visible: false, // for visibility of the additional window
            selected: null, //collecting selected trip
            hotel: {}, // collecting selected hotel
            transport: {}, // collecting selected trnasport
            dates: {}, // collecting selected hotel date range
            btnVisible: true, // for the acitivity of check out button
        };

        this.getTrips = this.getTrips.bind(this);
        this.selectTrip = this.selectTrip.bind(this);
        this.clearCart = this.clearCart.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.GetSelectedTime = this.GetSelectedTime.bind(this)
        this.setHotel = this.setHotel.bind(this)
        this.setTransport = this.setTransport.bind(this)
        this.checkOutButton = this.checkOutButton.bind(this)
    }

    componentDidMount() {
        this.getTrips();
    }

    getTrips() {
        $.getJSON({
            url: "/api/"
        })
            .then(trips => this.setState({ trips }))
            .catch(error => {
                console.log("Oops - ", error);
            });
    }

    // Here we get the selected period in the additional window
    GetSelectedTime(dates, dateStrings) {
        selectedTime = dateStrings
        this.handleOk()
    }

    // to get the hotel selection
    setHotel(data) {
        this.setState({
            hotel: data,
            current: this.state.current + 1,
        });
    }

    // to get the transport selection
    setTransport(data) {
        this.setState({
            transport: data,
            current: this.state.current + 1,
        });
    }

    // for show additional window
    showModal() {
        this.setState({
            visible: true
        });
    }

    // save the trip and the selected services via api service
    postSelectedTrip() {
        axios.post('http://127.0.0.1:8000/api/post/', {
            title: this.state.selected["title"],
            travel_style: this.state.selected["travel_style"],
            destination: this.state.selected["destination"],
            cost: this.state.selected["cost"],
            total: this.getCalcTotalCost(),
            duration_days: this.state.selected["duration_days"],
            hotelName: this.state.hotel["title"],
            hotelCheckIn: this.state.dates[0],
            hotelCheckOut: this.state.dates[1],
            hotelCost: this.state.hotel["cost"],
            transportationType: this.state.transport["type"],
            transportationCost: this.state.transport["cost"],
            totalHotelDays: this.getDateDiff(),
            totalhotelCost: this.getTotalHotelCost(),
        })
            .then(res => {
                this.getSelectedTrip();
            })
            .catch(error => console.log(error))
    }

    // get the trip and the selected services via api service
    getSelectedTrip() {
        axios.get('http://127.0.0.1:8000/api/get/')
            .then(res => {
                this.setState({
                    Cart: res.data,
                    selected: null,
                    hotel: {},
                    transport: {},
                    dates: {},
                });
            })
    }

    // remove all trips from djnago model via api service
    delSelectedTrip() {
        axios.delete('http://127.0.0.1:8000/api/del/', true)
            .then(res => {
                // console.log(res)
            })
    }

    // perform when service selection in completed
    handleOk(e) {
        this.setState({
            // calling postSelectedTrip as callback function because state is asynchronous
            visible: false,
            dates: selectedTime,
            btnVisible: false,
        }, () => {
            this.postSelectedTrip();
        });
        message.success("Trip added")
    }

    // get the selected trip
    selectTrip(trip) {
        this.setState({
            visible: true,
            current: 0,
            selected: trip,
        });
        this.removeTripFromCart(trip);
    }

    // removing trips when the are places in the cart
    removeTripFromCart(e) {
        this.setState({
            trips: this.state.trips.filter(function (item) {
                return item != e
            })
        });
    }

    // calculate the time selected time period in days 
    getDateDiff() {
        const startDate = new Date(selectedTime[0]);
        const endtDate = new Date(selectedTime[1]);
        const res = Math.abs(startDate - endtDate) / 1000;
        if ((Math.floor(res / 86400)) == 0) {
            return 1;
        }
        else {
            return (Math.floor(res / 86400));
        }
    }

    // calculate the total cost of the hotel service combined with the duration time period
    getTotalHotelCost() {
        return ((this.getDateDiff() * this.state.hotel["cost"]));
    }

    // calculating total cost for the trip combined with all service cost
    getCalcTotalCost() {
        return (this.getTotalHotelCost() + this.state.selected["cost"] + this.state.transport["cost"]);
    }

    // Clear all trips with selected services from cart
    clearCart() {
        this.setState({
            Cart: [],
            selected: null
        });
    }

    // perform when checkout button in clicked
    checkOutButton() {
        message.success("Your trip was successfully booked.")
        this.setState({
            btnVisible: true,
        });
        this.clearCart();
        this.delSelectedTrip();
        this.getTrips();
    }

    render() {
        return (
            <div className="container-fluid py-3 px-5">
                <div className="row text-center text-white">
                    <div className="col-lg-7 mx-auto">
                        <h1 className="display-4">Adventure Trips</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-lg-9 mx-auto">
                                <ul className="list-group shadow">
                                    {this.state.trips.map((trip, i) => (
                                        <Trip
                                            key={i}
                                            trip={trip}
                                            selectTrip={this.selectTrip}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <Cart
                            state={this.state}
                            Cart={this.state.Cart}
                            clearCart={this.clearCart}
                            removeFromCart={this.removeFromCart}
                            checkOutButton={this.checkOutButton}
                        />
                    </div>
                </div>
                <AdditionalWindows
                    visible={this.state.visible}
                    current={this.state.current}
                    showModal={this.showModal}
                    handleCancel={this.handleCancel}
                    GetSelectedTime={this.GetSelectedTime}
                    setHotel={this.setHotel}
                    setTransport={this.setTransport}
                    removeFromCart={this.removeFromCart}
                    selected={this.state.selected}
                />
            </div>
        );
    }
}
