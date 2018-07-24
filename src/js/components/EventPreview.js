import React from 'react';
import { Link } from "react-router-dom";

class EventPreview extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
                <li>
                    My event: { this.props.event.eventName }
                    More details: <Link to={'/events/' + this.props.event.id }>Link</Link>

                </li>
                )
    }
}

export default EventPreview