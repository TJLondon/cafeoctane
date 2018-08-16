import axios from 'axios';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
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
                {Object.keys(this.state.events).slice(0, 3).map(eventId =>
                    <EventPreview
                        key={eventId}
                        eventId={this.state.events[eventId]._id}
                        eventTitle={this.state.events[eventId].eventTitle}
                        eventStart={Helpers.transformDate(this.state.events[eventId].eventStart)}
                    />
                )}
            </div>
        )
    }
}