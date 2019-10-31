import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Hotel from './hotel'
import Transportation from './transportation'

class Trip extends PureComponent {
  constructor(props) {
    super(props)
  }

  addTrip () {
    this.props.selectTrip(this.props.trip.id)
    this.props.addToBasket(this.props.trip)
  }

  render () {
    const {
      id,
      travel_style,
      title,
      destination,
      duration_days,
      cost,
      hotels = [],
      transportation = []
    } = this.props.trip

    const showHotels = this.props.selected === id && hotels.length !== 0
    const showTransportation = this.props.selected === id && transportation.length !== 0

    return (
      <div>
        <li className='list-group-item clickable mt-3'>
          <div className='media align-items-lg-center flex-column flex-lg-row px-3'>
            <div className='media-body'>
              <h5 className='mt-0 font-weight-bold mb-2'>{title}</h5>
              <p className='font-italic text-muted mb-0 small'>Destination: {destination}</p>
              <p className='font-italic text-muted mb-0 small'>Duration: {duration_days} days</p>
              <p className='font-italic text-muted mb-0 small'>Travel style: {travel_style}  days</p>
              <div className='mt-1'>
                <h6 className='font-weight-bold my-2'>${cost}</h6>
              </div>
            </div>
            <img src='https://image.flaticon.com/icons/svg/201/201623.svg' width='100' className='ml-lg-5 order-1 order-lg-2'></img>
            <button className='btn btn-success' onClick={() => this.addTrip()}> Add </button>
          </div>
        </li>
        {showHotels &&
          <ul className='list-group'>
            {hotels.map((hotel, i) => (
              <Hotel
                key={i}
                hotel={hotel}
                addToBasket={this.props.addToBasket}
              />
            ))}
          </ul>
        }
        {showTransportation &&
          <ul className='list-group'>
            {transportation.map((transportation, i) => (
              <Transportation
                key={i}
                transportation={transportation}
                addToBasket={this.props.addToBasket}
              />
            ))}
          </ul>
        }
      </div>
    )
  }
}

Trip.propTypes = {
  trip: PropTypes.object.isRequired
}

export default Trip
