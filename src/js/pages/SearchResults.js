import Layout from '../layout/Layout';
import React from 'react';
import axios from 'axios';
import EventPreview from '../components/searchresults/EventPreview';
import EventDetails from '../components/searchresults/EventDetails';
import querySearch from "stringquery";

export default class SearchResults extends React.Component {
    state = {
        events: Object,
    };

    componentDidMount() {
        let obj = querySearch(this.props.location.search),
            url = '/api/events/geo';

        if (obj) {
           url = url
               + '?lng=' + obj.lng
               + '&lat=' + obj.lat
               + '&radius=' + obj.radius;
        }
        axios.get(url)
            .then(res => {
                const events = res.data;
                this.setState({ events });
            })
    }

    currentEvent() {
        if (this.props.match.params.id) {
            return (
                <EventDetails events eventid={this.props.match.params.id} />
            )
        }
        else {
            return (
            <ul>
                {Object.keys(this.state.events).map(eventId =>
                    <EventPreview key={eventId} event={this.state.events[eventId]} />
                )}
            </ul>
            )
        }
    }

    render() {
        return (
            <Layout>
                <div className="content">
                    <div className="container">
                        {this.currentEvent()}
                    </div>
                </div>
            </Layout>
        )
    }
}