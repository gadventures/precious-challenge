import $ from 'jquery';

const trips = [
    {
        title: 'Thailand Family Adventure',
        travel_style: 'Family',
        destination: 'Thailand',
        cost: 1649,
        duration_days: 0
    },
    {
        title: 'Local Living Ecuador -- Amazon Jungle',
        travel_style: 'Local Living Tours',
        destination: 'Ecuador',
        cost: 679,
        duration_days: 0
    },
    {
        title: 'Everest Base Camp Trek',
        travel_style: 'Active Tours',
        destination: 'Nepal',
        cost: 1495,
        duration_days: 0
    },
    {
        title: 'Maldives Dhoni Cruise',
        travel_style: 'Marine',
        destination: 'Maldives',
        cost: 1649,
        duration_days: 0
    }
]

class TripService {
    getTrips() {
        return trips;
        // $.getJSON({
        //     url: "/api/",
        // }).then((trips) => this.setState({ trips: trips })).catch(
        //     (error) => {
        //         console.log("Oops - ", error)
        // })
    }
}

const tripService = new TripService();
export default tripService;