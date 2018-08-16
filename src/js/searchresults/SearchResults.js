import axios from 'axios';
import EventDetails from './EventDetails';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
import Layout from '../common/layout/Layout';
import querySearch from "stringquery";
import React from 'react';

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: Object,
            loading: true
        };
    }

    componentDidMount() {
        let obj = querySearch(this.props.location.search),
            url = '/api/events';

        if (obj.lng && obj.lat) {
           url = url
               + '/geo'
               + '?lng=' + obj.lng
               + '&lat=' + obj.lat
               + '&radius=' + obj.radius;
        }
        axios.get(url)
            .then(res => {
                const events = res.data;
                this.setState({ events: events, loading: false });
            });
    }



    CurrentView() {
        if (this.props.match.params.id) {
            return (
                <EventDetails events eventid={this.props.match.params.id} />
            )
        }
        if (Object.keys(this.state.events).length > 0) {
            return (
                <div>
                    <h2 className="resultsCount">{Object.keys(this.state.events).length} events found</h2>
                    <div className="article-list">
                        {Object.keys(this.state.events).map((eventId) =>
                                    <EventPreview
                                        key={eventId}
                                        eventId={this.state.events[eventId]._id}
                                        eventTitle={this.state.events[eventId].eventTitle}
                                        eventStart={Helpers.transformDate( this.state.events[eventId].eventStart) }
                                    />
                        )}
                    </div>
                </div>
            )
        }

        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="material-icons loading">local_car_wash</i>
                </div>
            )
        }

        else if (Object.keys(this.state.events).length === 0 && this.state.loading === false) {
            return (
                <div className="box">
                    <h2>Dang it! We don't have <br />any events in that area</h2>

                    <p><a className="cta" href="">Suggest an event to us</a></p>
                    <p>or</p>
                    <p><a className="cta" href="/">Search again</a></p>
                </div>
            )
        }
    }

    render() {
        return (
            <Layout>
                <div className="content">
                    <div className="container">
                        {this.CurrentView()}
                    </div>
                </div>
            </Layout>
        )
    }
}