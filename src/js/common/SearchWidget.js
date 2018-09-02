import { DateRange } from 'react-date-range';
import LocationSearch from '../common/LocationSearch';
import React from 'react';
import { withRouter } from "react-router-dom";

class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                lng: '',
                lat: '',
                radius: ''
            },
            inputError: ''
        }
    }

    locationHandler = (coords) => {
        console.log(coords);
        if (coords.coordinates) {
            this.setState({
                location: {
                    lng: coords.coordinates['lng'],
                    lat: coords.coordinates['lat'],
                    radius: coords.distance
                }})
        }
    };

    submitSearch = (e) => {
        e.preventDefault();
        if (this.state.location === '') {
            this.setState({inputError: 'error'})
        }
        else {
            this.props.handler(this.state.location);
        }
    };

    render() {
        return (
            <div className="searchWidget">
                <form onSubmit={this.submitSearch}>
                <div className="container">
                    <LocationSearch onLocationSearch={ this.locationHandler }  />
                    <div className="inputWrap">
                        <button value="search" onClick={this.submitSearch}>Search</button>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchWidget)