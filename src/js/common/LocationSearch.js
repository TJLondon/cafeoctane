import GoogleLocationSearch from '../common/GoogleLocationSearch';
import React from 'react';

class LocationSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place: null,
            coordinates: null,
            distance: "25",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    onChange(loc) {
        if (loc.place) {
            this.setState({place: loc.place, coordinates: loc.coords}, () => {
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
            <div className="locationSearch">
                <div className="inputWrap">
                    <label>Location</label>
                    <GoogleLocationSearch className="form-control" country={'country:uk'} onChange={this.onChange.bind(this)} />
                </div>

                <div className="inputWrap">
                    <label>Within</label>
                    <div>
                        <select value={this.state.distance} onChange={this.handleChange.bind(this)}>
                            <option value={10}>10 miles</option>
                            <option value={25}>25 miles</option>
                            <option value={50}>50 miles</option>
                            <option value={100}>100 miles</option>
                            <option value={250}>250 miles</option>
                            <option value={1000}>National</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
export default LocationSearch;