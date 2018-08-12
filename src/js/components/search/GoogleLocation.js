import { GoogleComponent } from 'react-google-location'
import React, { Component } from 'react';

const API_KEY = 'AIzaSyCBQPdAc6XhD7cHv_HKopDeT1tMdJhAaCM';

class LocationSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            place: null,
            coordinates: null,
            distance: "25",
        };
        //this.handleChange = this.handleChange.bind(this);
    }

    onChange(loc) {
        if (loc.place) {
            this.setState({place: loc.place, coordinates: loc.coordinates}, () => {
                this.props.onLocationSearch(this.state);
            });
        }
    }

    handleChange(event) {
        this.setState({distance: event.target.value}, () => {
            this.props.onLocationSearch(this.state);
        });
    }

    render() {
        return (
            <div className="LocationSearch">
                <div className="row">
                        <label>Location</label>
                            <GoogleComponent
                                apiKey={API_KEY}
                                language={'en'}
                                className="form-control"
                                country={'country:in|country:uk'}
                                coordinates={true}
                                onChange={this.onChange.bind(this)} />

                </div>
                <div className="row">
                    <label>Within</label>
                    <div>
                            <select value={this.state.distance} onChange={this.handleChange.bind(this)}>
                                <option value={10}>10 miles</option>
                                <option value={25}>25 miles</option>
                                <option value={50}>50 miles</option>
                                <option value={100}>100 miles</option>
                                <option value={250}>250 miles</option>
                            </select>
                    </div>
                    </div>
                </div>
        )
    }
}
export default LocationSearch;