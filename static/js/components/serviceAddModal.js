import React from 'react';
import Modal from '../lib/Modal';
import Button from '../lib/Button';
import axios from 'axios';
import PropTypes from 'prop-types';

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
        $event.preventDefault();

        const { serviceId } = this.state;

        const tripsServiceResp = await this.createTripsService({
            serviceId: +serviceId,
            tripId: this.props.trip.id
        });

        this.props.onSubmit(tripsServiceResp);
        this.props.onClose();
    }

    // createTripsService makes a call to /api/trips_services which creates a trips_service record and returns it in JSON format
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
                        </div>
                        <div className="form-group">
                            <Button variant="primary" type="submit" className="mr-2" onClick={this.handleSubmit}>Submit</Button>
                            <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        )
    }
}

ServiceAddModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    trip: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired
}

export default ServiceAddModal;