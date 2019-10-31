import PropTypes from "prop-types"
import React, { PureComponent } from "react"

class Basket extends PureComponent {
  constructor(props) {
    super(props);
  }
  render () {
    // Looping over each item in the basket and adding their cost to produce total cost
    const total = this.props.basket.reduce((prevTotal, item) => {
      if (!item || !item.cost) return prevTotal
      return prevTotal + item.cost
    }, 0)

    return (
      <div className="card mt-3 sticky-top">
        <div className="card-body">
          <h3 className='text-center'>Your trip</h3>
          <span className="text-muted">Items:</span>
          <span className="font-weight-bold my-2">{this.props.basket.length}</span>
          <div className='float-right'>
            <span className="text-muted">Total:</span>
            <span className='font-weight-bold my-2'>${total}</span>
          </div>
          <ul className='list-group my-3'>
            {this.props.basket.map((item, i) => (
              <li key={i} className='list-group-item col-lg-12 py-1 mx-auto'>
                <div className='media align-items-lg-center flex-column flex-lg-row p-1'>
                  <div className='media-body'>
                    <button className='btn btn-danger float-right' onClick={() => this.props.removeFromBasket(item)}>X</button>
                    <h6 className='mt-0 mb-2'>{item.title || item.name}</h6>
                    <div className='mt-1'>
                      <h6 className='font-weight-bold my-2'>${item.cost}</h6>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <a href='#' className='btn btn-danger' onClick={() => this.props.clearBasket()}>Clear</a>
          <a href='#'
            className={`btn btn-success float-right ${this.props.basket.length === 0 && 'disabled'}`}
            onClick={() => alert('You have successfully booked your trip!')}>
              Checkout
          </a>
        </div>
      </div>
    )
  }
}

Basket.propTypes = {
  basket: PropTypes.array.isRequired
}

export default Basket
