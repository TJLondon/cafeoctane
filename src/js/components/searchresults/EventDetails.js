import axios from 'axios';
import React from 'react';


class EventDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        event: Object
    };

    componentDidMount() {

        console.log(`/api/events/` + this.props.eventid);

        axios.get(`/api/events/` + this.props.eventid)
            .then(res => {
                const event = res.data;
                this.setState({ event });
            })
    }

    render() {
        return (
            <div>
                <h2>{this.state.event.eventTitle}</h2>

                <p>
                    {this.state.event.eventSummary}
                </p>

                <p>{this.state.event.eventStart} to {this.state.event.eventEnd}</p>

                <p>Organiser: {this.state.event.eventOrganiser}</p>

                <p><strong>Price:</strong> {this.state.event.eventPrice}</p>

                <p>Find out more: <a href={this.state.event.eventURL}>Website</a></p>

                <p>Id: {this.state.event._id}</p>
            </div>

        )
    }
}

export default EventDetails