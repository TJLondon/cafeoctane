import { DateRange } from 'react-date-range';
import Helpers from '../common/Helpers';
import LocationSearch from '../common/LocationSearch';
import React from 'react';
import { withRouter } from "react-router-dom";

class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            showDatePicker: false,
            datePickerStart: '',
            datePickerEnd: ''
        }
    }

    handleSelect = (date) => {
            this.setState({
                datePickerStart: Helpers.transformDate(date.startDate._d),
                datePickerEnd: Helpers.transformDate(date.endDate._d) });
    };

    locationHandler = (coords) => {
        if (coords) {
            this.setState({location: coords})
        }
    };

    dateSelect = () => {
        this.setState({ showDatePicker: true });
    };

    submitSearch = (e) => {
        e.preventDefault();
        let query =
            "?lng=" + this.state.location.coordinates.lng +
            "&lat=" + this.state.location.coordinates.lat +
            "&radius=" + this.state.location.distance;
        this.props.history.push("/events" + query);
    };

    render() {
        return (
            <div className="searchWidget">
                <form onSubmit={this.submitSearch}>
                <div className="container">


                    <LocationSearch onLocationSearch={ this.locationHandler }  />

                    <div className="inputWrap">
                        {this.state.showDatePicker ? <DateRange onInit={this.handleSelect} onChange={this.handleSelect} /> : null }
                        <label>From</label>
                        <input onClick={this.dateSelect} value={this.state.datePickerStart} type="text"  />
                    </div>

                    <div className="inputWrap">
                        <label>To</label>
                        <input onClick={this.dateSelect} value={this.state.datePickerEnd} type="text"  />
                    </div>

                    <div className="inputWrap">
                        <button value="search" onClick={this.submitSearch}>Search</button>
                    </div>

                </div>

                <a href="#" onClick={this.props.handler} className="exit">
                    <i className="material-icons">close</i>
                </a>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchWidget)