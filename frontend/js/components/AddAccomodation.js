import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {postAccomodation} from '../data/requests/postAccomodation'
class AddAccomodation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trip: this.props.trip.id,
            name: null,
            typeOfService: 'accomodation',
            location: null,
            cost: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //update the state to include form data
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    //send form data to the db
    handleSubmit(e, data) {
        //on form submit, prevent the browser from refreshing
        e.preventDefault();
        //post form data to db
        postAccomodation(data);
        //go back to home page
        this.props.history.push('/');
    }

    render() {
        const {trip} = this.props;
        return (
            <div className="container" style={{ maxWidth: '600px' }}>
                <h4 className="text-center">Add Accomodation to the {trip.title} Trip</h4>
                <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Name
                        </label>
                        <div className="col-sm-10">
                            <input name="name" onChange={this.handleChange} className="form-control" type="text" />
                            <span className="help-block">The name of the accomodation</span>
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Type Of Service
                        </label>
                        <div className="col-sm-10">
                            <input name="typeOfService" onChange={this.handleChange} className="form-control" defaultValue="accomodation" />
                            <span className="help-block">The type of the service that you offer</span>
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Location
                        </label>
                        <div className="col-sm-10">
                            <input name="location" onChange={this.handleChange} className="form-control" type="text" />
                            <span className="help-block">The location of the service</span>
                        </div>
                    </div>
                    <div className="form-group ">
                        <label className="col-sm-2 control-label ">
                            Cost
                        </label>
                        <div className="col-sm-10">
                            <input name="cost" onChange={this.handleChange} className="form-control" type="number" />
                            <span className="help-block">Cost of the accomodation</span>
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

export default withRouter(AddAccomodation);