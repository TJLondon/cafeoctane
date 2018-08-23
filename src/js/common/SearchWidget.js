import { DateRange } from 'react-date-range';
import LocationSearch from '../common/LocationSearch';
import React from 'react';
import { withRouter } from "react-router-dom";

class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            inputError: '',
            showDatePicker: false,
            datePickerStart: '',
            datePickerEnd: ''
        }
    }


    componentDidMount() {

    }


    locationHandler = (coords) => {
        if (coords) {
            this.setState({location: coords})
        }
    };

    submitSearch = (e) => {
        e.preventDefault();
        if (this.state.location === '') {
            this.setState({inputError: 'error'})
        }
        else {
            let query = "?lng=" + this.state.location.coordinates.lng +
                "&lat=" + this.state.location.coordinates.lat +
                "&radius=" + this.state.location.distance;
            this.props.handler(query);
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