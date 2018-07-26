import React from 'react';
import { withRouter } from "react-router-dom";
import LocationSearch from '../components/search/GoogleLocation';
import EventTypeSelect from '../components/search/EventTypeSelect';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            eventType: ''
        }
    }
    locationHandler = (coords) => {
        if (coords) {
            this.setState({location: coords})
            console.log(coords);
        }
    };

    typeSelectHandler = (val) => {
        this.setState({eventType: val})
    };

    submitSearch = (e) => {
        console.log(this.state);
        e.preventDefault();
        let query =
            "?lng=" + this.state.location.coordinates.lng +
            "&lat=" + this.state.location.coordinates.lat +
            "&radius=" + this.state.location.distance +
            "&type=" + this.state.eventType;
        this.props.history.push("/events" + query);
    };

    render() {
        return (
            <form className="search" onSubmit={this.submitSearch} >
                <div className="row">
                    <div class="col-sm-3">
                        <EventTypeSelect onTypeSelect={this.typeSelectHandler} />
                    </div>
                </div>
                <div className="row">
                    <div class="col-sm-3">
                        <LocationSearch onLocationSearch={ this.locationHandler }  />
                    </div>
                </div>
                <button className="btn btn-lg btn-r" disabled={!this.state.location.coordinates} value="Search">Search</button>
            </form>
        )
    }
}
export default withRouter(Search);