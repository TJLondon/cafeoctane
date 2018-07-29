import React from 'react';
import { Redirect, Router } from 'react-router';
import { Link  } from "react-router-dom";

class EventPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    d1 = this.props.event.eventStart.split("/");
    date = new Date(this.d1[0], this.d1[1], this.d1[2]);

    imageStyle = {
        backgroundImage: 'url(/assets/img/event_thumb.jpg)'
    };

    handleOnClick() {
        this.setState({redirect: '/events/' + this.props.event._id});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />;
        }
        return (
                <article onClick={this.handleOnClick}>
                    <div className="thumb" style={this.imageStyle}>
                    </div>
                    <div className="grad"></div>
                    <div className="article-copy">
                        <h3>
                            { this.props.event.eventTitle }
                            </h3>
                        <p>
                            { this.props.event.eventStart }
                        </p>
                    </div>
                </article>
                )
    }
}
export default EventPreview