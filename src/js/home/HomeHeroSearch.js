import React from 'react';
import { withRouter } from "react-router-dom";
import LocationSearch from '../common/LocationSearch';

class HomeHeroSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }
    }
    locationHandler = (coords) => {
        if (coords) {
            this.setState({location: coords})
        }
    };

    submitSearch = (e) => {
        e.preventDefault();
        let query =
            "?lng=" + this.state.location.coordinates.lng +
            "&lat=" + this.state.location.coordinates.lat +
            "&radius=" + this.state.location.distance +
            "&place=" + this.state.location.place;
        this.props.history.push("/events" + query);
    };

    render() {
        return (
            <div className="section-welcome">
                <div className="container">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <form className="search" onSubmit={this.submitSearch} >
                                <LocationSearch onLocationSearch={ this.locationHandler.bind(this) }  />
                            <button disabled={!this.state.location.coordinates}>SEARCH</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(HomeHeroSearch);