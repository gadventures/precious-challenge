import React, { Component } from 'react';
import { postHotel } from '../data/requests/postHotel'
import styles from './Components.module.css'

class AddHotel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trip: this.props.trip.id,
            name: null,
            typeOfService: 'hotel',
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
        postHotel(data);
    }

    render() {
        const {trip} = this.props;
        return (
            <div className={`${styles.wrapper} container`}>
                <h4 className={`${styles.heading} "text-center"`}>Add Hotel to the {trip.title} Trip</h4>
                <div className={styles.form}>
                    <form onSubmit={(e) => this.handleSubmit(e, this.state)}>
                        <div className="form-group ">
                            <label className="col-sm-2 control-label ">
                                Name
                        </label>
                            <div className="col-sm-10">
                                <input name="name" onChange={this.handleChange} className="form-control" type="text" placeholder="The name of the hotel" required />
                                <br />
                            </div>
                        </div>
                        <div className="form-group ">
                            <label className="col-sm-2 control-label ">
                                Service
                        </label>
                            <div className="col-sm-10">
                                <input name="typeOfService" onChange={this.handleChange} className="form-control" defaultValue="hotel" placeholder="The type of the service that you offer" required />
                                <br />
                            </div>
                        </div>
                        <div className="form-group ">
                            <label className="col-sm-2 control-label ">
                                Location
                        </label>
                            <div className="col-sm-10">
                                <input name="location" onChange={this.handleChange} className="form-control" type="text" placeholder="The location of the service" required />
                                <br />
                            </div>
                        </div>
                        <div className="form-group ">
                            <label className="col-sm-2 control-label ">
                                Cost
                        </label>
                            <div className="col-sm-10">
                                <input name="cost" onChange={this.handleChange} className="form-control" type="number" placeholder="The cost of the hotel" required />
                                <br />
                            </div>
                        </div>
                        <div className={`${styles.btnActions} "form-actions"`}>
                            <button className="btn btn-primary js-tooltip" type="submit">POST</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddHotel;