import React, { Component } from 'react';
import Trip from "./trip"
import axios from "axios";
import Tab from '../lib/Tab';
import Service from './service';
import Button from '../lib/Button';
import ServiceCreateModal from './serviceCreateModal';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            // create an empty array that will hold the trips
            trips: [],
            services: [],
            showCreateServiceModal: false,
            showAddServiceModal: false
        }

        this.getTrips = this.getTrips.bind(this);
        this.getServices = this.getServices.bind(this);
        this.openServiceCreateModal = this.openServiceCreateModal.bind(this);
        this.closeServiceCreateModal = this.closeServiceCreateModal.bind(this);
      
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    // We have 2 approaches one to cache locally or to fetch everytime on change
    // The first one is better but I wont have time to implement it
    refresh() {
        this.getTrips();
        this.getServices();
    }

    openServiceCreateModal() {
        this.setState({ showCreateServiceModal: true });
    }

    closeServiceCreateModal() {
        this.setState({ showCreateServiceModal: false })
    }


    render() {
        return (
            <div className="container-fluid">
                <Tab>
                    <Tab.Pane label="Adventure Trips">
                        <div className="row">
                            {this.state.trips.map((trip, i) => (
                                <div key={i} className="col-md-4">
                                    <Trip
                                        trip={trip}
                                        services={this.state.services}
                                        onSubmit={this.refresh}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                    <Tab.Pane label="Adventure Services">
                        <div className="row">
                            <Button variant="primary" onClick={this.openServiceCreateModal}>Create Service</Button>
                        </div>
                        <hr />
                        <ServiceCreateModal
                            show={this.state.showCreateServiceModal}
                            onClose={this.closeServiceCreateModal}
                            onSubmit={this.refresh}
                        ></ServiceCreateModal>
                        <div className="row">
                            {this.state.services.map((service, i) => (
                                <div key={i} className="col-md-4">
                                    <Service
                                        service={service}
                                    />
                                </div>
                            ))}
                        </div>
                    </Tab.Pane>
                </Tab>
            </div>
        );
    }

    // getTrips makes a call to /api/ which returns the trip data in JSON format
    // Much more complicated then expected, because of limitations of test api
    // If redone should join services and trips together in a signle request
    // TODO(PPavlov): Add error handling
    async getTrips() {
        const tripsUrl = `${process.env.API_URL}/trips?_embed=trips_services`;
        const servicesUrl = `${process.env.API_URL}/services/`;

        let tripsResp = await axios.get(tripsUrl);
        let trips_servicesResp = [].concat.apply([], tripsResp.data.map(x => x.trips_services).filter(Boolean));
        let servicesResp = await Promise.all(trips_servicesResp.map(async (t) => await axios.get(servicesUrl + t.serviceId)));

        let services = servicesResp.map(x => x.data);
        let trips = tripsResp.data;

        trips.forEach(x => x.services = x.trips_services.map(t => services.find(s => s.id === t.serviceId)));

        this.setState({ trips })
    }

    // getServices makes a call to /api/ which returns the services data in JSON format
    async getServices() {
        const servicesUrl = `${process.env.API_URL}/services`;

        let servicesResp = await axios.get(servicesUrl);
        let services = servicesResp.data;

        this.setState({ services })
    }
}
