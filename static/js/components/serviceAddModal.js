import React from 'react';
import Modal from '../lib/Modal';
import Button from '../lib/Button';
import axios from 'axios';

class ServiceAddModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serviceId: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ target }) {
        this.setState({ [target.name]: target.value })
    }

    async handleSubmit($event) {
        debugger;
        
        $event.preventDefault();

        const { serviceId } = this.state;

        const tripsServiceResp = await this.createTripsService({
            serviceId: +serviceId,
            tripId: this.props.trip.id
        });

        this.props.onSubmit(tripsServiceResp);
        this.props.onClose();
    }

    async createTripsService({ serviceId, tripId }) {
        const tripsServiceUrl = `${process.env.API_URL}/trips_services`;

        const tripsServiceResp = await axios.post(tripsServiceUrl, { serviceId, tripId });

        return tripsServiceResp.data;
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header onClose={this.props.onClose}>
                    Add Service
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="serviceId">Select Service</label>
                            <select value={this.state.service} onChange={this.handleChange} name="serviceId" className="form-control" id="serviceId">
                                <option disabled selected defaultValue={null}> -- select an option -- </option>
                                {this.props.services.map((x, i) => (
                                    <option key={i} value={x.id}>{x.name}</option>
                                ))}
                            </select>
                            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                            <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        )
    }
}

export default ServiceAddModal;