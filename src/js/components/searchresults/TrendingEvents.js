import axios from 'axios';
import EventPreview from '../searchresults/EventPreview';
import React from 'react';

export default class TrendingEvents extends React.Component {
    state = {
        events: Object
    };

    componentDidMount() {
        axios.get('api/events/trending')
            .then(res => {
                const events = res.data;
                this.setState({ events });
            })
    }

    render() {
        return (
            <div className="article-home">
                {Object.keys(this.state.events).map(eventId =>
                    <EventPreview key={eventId} event={this.state.events[eventId]} />
                )}
            </div>
        )
    }
}