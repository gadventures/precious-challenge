import PropTypes from "prop-types";
import React, { PureComponent } from "react";

class Trip extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            travel_style,
            title,
            destination,
            duration_days,
            cost
        } = this.props.trip;

        return (
            <div>
                <li className="list-group-item clickable mt-3">
                    <div className="media align-items-lg-center flex-column flex-lg-row px-3">
                        <div className="media-body">
                            <h5 className="mt-0 font-weight-bold mb-2">{title}</h5>
                            <p className="font-italic text-muted mb-0 small">
                                Destination: {destination}
                            </p>
                            <p className="font-italic text-muted mb-0 small">
                                Duration: {duration_days} days
              </p>
                            <p className="font-italic text-muted mb-0 small">
                                Travel style: {travel_style} days
              </p>
                            <div className="mt-1">
                                <h6 className="font-weight-bold my-2">${cost}</h6>
                            </div>
                        </div>
                        <img
                            src="https://gallileo.me/wp-content/uploads/2019/08/1_CsDgB2D8KIetB_e37t3n_A.jpeg"
                            width="100"
                            className="ml-lg-5 order-1 order-lg-2 rounded"
                        ></img>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.props.selectTrip(this.props.trip)}
                        >
                            {" "}
                            Get{" "}
                        </button>
                    </div>
                </li>
            </div>
        );
    }
}

Trip.propTypes = {
    trip: PropTypes.object.isRequired
};

export default Trip;
