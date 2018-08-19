import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import React from 'react';
import Bookmark from "./Bookmark";

class EventPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
    }

    imageStyle = {
        backgroundImage: 'url(/assets/img/event_thumb.jpg)'
    };

    componentDidMount() {

    }
    render() {

        return (
            <article>
                <Bookmark
                    user={this.props.user}
                    bookmarks={this.props.bookmarks}
                    eventId={this.props.eventId} />
                <Link to={'/events/' + this.props.eventId}>
                    <div className="thumb" style={this.imageStyle}></div>
                    <div className="grad"/>
                    <div className="article-copy">
                        <h3>
                            {this.props.eventTitle}
                        </h3>
                        <p>
                            {this.props.eventStart}
                        </p>
                    </div>
                </Link>
            </article>
        )
    }
};
export default withRouter(EventPreview)