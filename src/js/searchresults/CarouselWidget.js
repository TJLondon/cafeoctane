import axios from 'axios';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
import React from 'react';

export default class CarouselWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: Object
        }
    }
    componentDidMount() {
        axios.get('api/events/' + this.props.category + '/' + this.props.limit)
            .then(res => {
                const events = res.data;
                this.setState({ events });
            })
    }

    render() {
        return (
            <div className="article-home">
                {Object.keys(this.state.events).map(eventId =>
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