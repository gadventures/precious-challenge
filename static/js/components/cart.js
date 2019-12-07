import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { List, Icon, Popover, message } from 'antd';

class Cart extends PureComponent {
    constructor(props) {
        super(props);
    }

    // html structure for hotel popup window
    hotelcontent(data) {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="col">Hotel</th>
                        <th scope="col">{data[0]}</th>
                    </tr>
                    <tr>
                        <th scope="col">Check in</th>
                        <th scope="col">{data[1]}</th>
                    </tr>
                    <tr>
                        <th scope="col">Check out</th>
                        <th scope="col">{data[2]}</th>
                    </tr>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col">{data[3]} USD / night</th>
                    </tr>
                </tbody>
            </table>
        )
    }

    // html structure for transport popup window
    transportcontent(data) {
        return (
            <table className="table">
                <tbody>
                    <tr>
                        <th scope="col">Transport</th>
                        <th scope="col">{data[0]}</th>
                    </tr>
                    <tr>
                        <th scope="col">Price</th>
                        <th scope="col">{data[1]} USD</th>
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {

        // calculate total cost for the cart via loop though all trips total cost selected
        var cartTotal = 0;
        if (this.props.Cart.length > 0) {
            this.props.Cart.map((item, i) => {
                cartTotal = parseInt(cartTotal) + parseInt(this.props.Cart[i]["total"]);
            })
        }

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        return (
            <div className="card mt-3">
                <div className="card-body">
                    <h3 className="text-center">Selected</h3>
                    <div className="float-right">
                        <span className="text-muted">Cart total: </span>
                        <span className="font-weight-bold my-2">{cartTotal} USD</span>
                    </div>
                    <ul className="list-group my-5">
                        {this.props.Cart.map((item, i) => (
                            <li key={i} className="list-group-item col-lg-12 py-1 mx-auto">
                                <div className="media align-items-lg-center flex-column flex-lg-row p-1">
                                    <div className="media-body">
                                        <List
                                            itemLayout="vertical"
                                            size="large"
                                            pagination={null}
                                            dataSource={[item]}
                                            footer={null}
                                            renderItem={item => (
                                                <List.Item
                                                    key={i}
                                                    actions={[
                                                        <Popover content={this.hotelcontent([
                                                            this.props.Cart[i]["hotelName"],
                                                            this.props.Cart[i]["hotelCheckIn"],
                                                            this.props.Cart[i]["hotelCheckOut"],
                                                            this.props.Cart[i]["hotelCost"],
                                                        ])}>
                                                            <IconText type="home" text={(this.props.Cart[i]["totalhotelCost"]) + " USD"} key="list-vertical-home" /><br />
                                                        </Popover>,
                                                        <Popover content={this.transportcontent([
                                                            this.props.Cart[i]["transportationType"],
                                                            this.props.Cart[i]["transportationCost"],
                                                        ])}>
                                                            <IconText type="car" text={(this.props.Cart[i]["transportationCost"]) + " USD"} key="list-vertical-car" /><br />
                                                        </Popover>
                                                    ]}
                                                >
                                                    <List.Item.Meta
                                                        title={<span>{item["title"]}</span>}
                                                        description={
                                                            <div>
                                                                <span>Base price: {this.props.Cart[i]["cost"]} USD</span>
                                                                <br />
                                                                <span>Total price: {this.props.Cart[i]["total"]} USD</span>
                                                            </div>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        disabled={this.props.state.btnVisible}
                        className={`btn btn-primary float-right ${this.props.Cart.length ===
                            0 && "disabled"}`}
                        onClick={() => this.props.checkOutButton()}
                    >
                        Checkout
          </button>
                </div>
            </div >
        );
    }
}

Cart.propTypes = {
    Cart: PropTypes.array.isRequired
};

export default Cart;
