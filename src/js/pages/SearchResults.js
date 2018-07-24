import React from 'react';
import axios from 'axios';
import EventPreview from '../components/EventPreview';
import EventDetails from '../components/EventDetails';

export default class SearchResults extends React.Component {
    state = {
        events: Object
    };

    componentDidMount() {
        axios.get(`/api/events`)
            .then(res => {
                const events = res.data.events;
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
            <div>
                <h2>Results</h2>
                <div>
                    {this.currentEvent()}
                </div>
            </div>

        )
    }
}