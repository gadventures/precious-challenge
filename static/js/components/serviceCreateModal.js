import React from 'react';
import Button from "../lib/Button"
import Modal from "../lib/Modal"
import axios from 'axios';

class ServiceCreateModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            type: '',
            cost: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({ target }) {
        this.setState({ [target.name]: target.value })
    }

    async handleSubmit($event) {
        $event.preventDefault();

        const { name, location, type, cost } = this.state;

        const service = await this.createService({ name, location, type, cost });

        this.props.onSubmit(service);
        this.props.onClose();
    }

    async createService({ name, location, type, cost }) {
        const servicesUrl = `${process.env.API_URL}/services`;

        const serviceResp = await axios.post(servicesUrl, { name, location, type, cost });

        return serviceResp.data;
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header onClose={this.props.onClose}>
                    Create Service
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input name="name" value={this.state.name} onChange={this.handleChange} type="text" className="form-control" id="name" placeholder="Enter Name"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input name="location" value={this.state.location} onChange={this.handleChange} type="text" className="form-control" id="location" placeholder="Location"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Type</label>
                            <input name="type" value={this.state.type} onChange={this.handleChange} type="text" className="form-control" id="type" placeholder="Type"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">Cost</label>
                            <input name="cost" value={this.state.cost} onChange={this.handleChange} type="decimal" className="form-control" id="cost" placeholder="Cost"></input>
                        </div>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
                        <Button variant="secondary" onClick={this.props.onClose}>Cancel</Button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }


}

export default ServiceCreateModal;