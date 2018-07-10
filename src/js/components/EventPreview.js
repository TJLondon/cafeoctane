import React from 'react';

class EventPreview extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                My event: { this.props.event.eventName }
                { this.props.event.id }
                </div>
                )
    }
}

export default EventPreview