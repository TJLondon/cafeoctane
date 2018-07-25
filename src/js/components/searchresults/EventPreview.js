import React from 'react';
import { Link } from "react-router-dom";

class EventPreview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
                <li>
                        <h2>
                            { this.props.event.eventTitle }
                            </h2>
                        <p>
                            More details: <Link to={'/events/' + this.props.event._id }>Link</Link>
                        </p>
                </li>
                )
    }
}

export default EventPreview