import React from 'react';
import axios from 'axios';
import EventPreview from '../components/EventPreview';

export default class SearchResults extends React.Component {
    state = {
        events: Object
    };

    componentDidMount() {
        console.log('mounted');
        axios.get(`/api/events`)
            .then(res => {
                const events = res.data.events;
                this.setState({ events });
            })
    }

    render() {
        return (
            <div>
                <h2>Results</h2>
                <div>
                    { Object.keys(this.state.events).map(eventId =>
                        <EventPreview key={eventId} event={this.state.events[eventId]} />
                    )}
                </div>
            </div>
        )
    }
}