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
                <h2>{this.state.event.eventName}</h2>

                <p>
                    {this.state.event.eventDesc}
                </p>

                <p>Id: {this.state.event.id}</p>
            </div>

        )
    }
}

export default EventDetails