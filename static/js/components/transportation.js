import PropTypes from "prop-types"
import React, { PureComponent } from "react"

class Transportation extends PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    const { name, cost, location } = this.props.transportation

    return (
      <li className='list-group-item col-lg-10 mx-auto'>
        <div className='media align-items-lg-center flex-column flex-lg-row p-1'>
          <div className='media-body'>
            <h5 className='mt-0 font-weight-bold mb-2'>{name}</h5>
            <p className='font-italic text-muted mb-0 small'>Location: {location}</p>
            <div className='mt-1'>
              <h6 className='font-weight-bold my-2'>${cost}</h6>
            </div>
          </div>
          <button className='btn btn-success' onClick={() => this.props.addToBasket(this.props.transportation)}>Add Transportation</button>
          <img src='https://image.flaticon.com/icons/svg/224/224637.svg' width='80' className='ml-lg-5 order-1 order-lg-2'></img>
        </div>
      </li>
    )
  }
}

Transportation.propTypes = {
  transportation: PropTypes.object.isRequired
}

export default Transportation
