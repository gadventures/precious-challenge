import React, { Component } from "react"
import Trip from "./trip"
import Basket from "./basket"
import $ from "jquery"
import "../../css/styles.scss"

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      trips: [],
      basket: [],
      totalCost: 0,
      selected: null // this is used to show the services for the selected trip
    }

    this.addToBasket = this.addToBasket.bind(this)
    this.getTrips = this.getTrips.bind(this)
    this.selectTrip = this.selectTrip.bind(this)
    this.clearBasket = this.clearBasket.bind(this)
    this.removeFromBasket = this.removeFromBasket.bind(this)
  }

  componentDidMount() {
    this.getTrips()
  }

  // getTrips makes a call to /api/ which returns the trip data in JSON format
  // maybe use react ajax call - https://reactjs.org/docs/faq-ajax.html
  getTrips() {
    $.getJSON({
      url: "/api/"
    })
      .then(trips => this.setState({ trips }))
      .catch(error => {
        console.log("Oops - ", error)
      })
  }

  selectTrip(trip) {
    // adding callback here as I want to make sure the basket is cleared when selecting new trip,
    // otherwise it doesn't update in time synce setState is asynchronous
    this.setState({
      selected: trip.id,
      basket: []
    }, () => {
      this.addToBasket(trip)
    })
  }

  addToBasket(item) {
    // check if there is an item of that type already in the basket and replace it
    // as we only want to book maximum 1 item of each type for a single trip
    if (this.state.basket.some(basketItem => basketItem.type === item.type)) {
      this.state.basket.filter(itemInBasket => itemInBasket.type !== item.type)
      this.setState({
        basket: this.state.basket.filter(
          itemInBasket => itemInBasket.type !== item.type
        )
      })
    }

    // adding the new item into the basket state
    this.setState(prevState => ({
      basket: [...prevState.basket, item]
    }))
  }

  removeFromBasket(item) {
    // loop through the items in the basket and filter out the matching one
    this.setState({
      basket: this.state.basket.filter(basketItem => basketItem !== item)
    })
  }

  clearBasket() {
    this.setState({
      basket: [],
      selected: null
    })
  }

  render() {
    return (
      <div className='container-fluid py-3 px-5'>
        <div className='row text-center text-white'>
          <div className='col-lg-7 mx-auto'>
            <h1 className='display-4'>Adventure Trips</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-9 mx-auto'>
                <ul className='list-group shadow'>
                  {this.state.trips.map((trip, i) => (
                    <Trip
                      key={i}
                      trip={trip}
                      addToBasket={this.addToBasket}
                      selectTrip={this.selectTrip}
                      selected={this.state.selected}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <Basket
              basket={this.state.basket}
              clearBasket={this.clearBasket}
              removeFromBasket={this.removeFromBasket}
            />
          </div>
        </div>
      </div>
    )
  }
}
