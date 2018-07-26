import { GoogleComponent } from 'react-google-location'
import React, { Component } from 'react';

const API_KEY = 'AIzaSyCBQPdAc6XhD7cHv_HKopDeT1tMdJhAaCM';

class LocationSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            coordinates: null,
            distance: 50,
        };
    }

    onDistance = (val) => {
        this.setState({distance : val.target.value})
    }


    onChange(loc) {
        if (loc.place) {
            this.setState({place: loc.place, coordinates: loc.coordinates});
            this.props.onLocationSearch(this.state);
        }
    }

    render() {
        return (
            <div className="LocationSearch">
                <label>Within</label>
                <select className="form-control" value={this.state.distance} onChange={this.onDistance.bind(this)}>
                    <option value={10}>10 miles</option>
                    <option value={25}>25 miles</option>
                    <option value={50}>50 miles</option>
                    <option value={100}>100 miles</option>
                    <option value={250}>250 miles</option>
                </select>

                <label>Near</label>
                <GoogleComponent
                    apiKey={API_KEY}
                    language={'en'}
                    className="form-control"
                    country={'country:in|country:uk'}
                    coordinates={true}
                    onChange={this.onChange.bind(this)} />
            </div>

        )
    }
}
export default LocationSearch;