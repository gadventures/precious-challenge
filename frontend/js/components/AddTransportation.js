import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {postHotel} from '../data/requests/postHotel'
class AddTransportation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trip: this.props.trip.id,
            name: null,
            typeOfService: null,
            location: null,
            cost: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e, data) {
        e.preventDefault();
        postHotel(data);
        this.props.history.push('/');
    }

    render() {
        const {trip} = this.props;
        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <h4 className="text-center">Add Transportation Service to the {trip.title} Trip</h4>
                <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Name
                        </label>
                        <div className="col-sm-10">
                            <input name="name" onChange={this.handleChange} className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Type Of Service
                        </label>
                        <div className="col-sm-10">
                            <textarea name="typeOfService" onChange={this.handleChange} className="form-control" defaultValue={"transportation"} />
                            <span className="help-block">The name of the service, e.g. hotel, accomodation or transportation</span>
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Location
                        </label>
                        <div className="col-sm-10">
                            <input name="location" onChange={this.handleChange} className="form-control" type="text" />
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Cost
                        </label>
                        <div className="col-sm-10">
                            <input name="cost" onChange={this.handleChange} className="form-control" type="number" />
                            <span className="help-block">Cost of the hotel</span>
                        </div>
                    </div>
                    <div className="form-actions" style={{ float: 'right', paddingBottom: '2em' }}>
                        <button className="btn btn-primary js-tooltip" type="submit">POST</button>
                    </div>
                </form>
            </div>
        )

    }
}

export default withRouter(AddTransportation);