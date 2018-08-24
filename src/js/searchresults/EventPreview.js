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
                <Link to={'/event/'+this.props.eventTitle.replace(/\s+/g, '-').toLowerCase() + '/' + this.props.eventId}>
                    <div className={'dateDisplay'}>
                        <span>{this.props.eventStart[0]}</span>
                        {this.props.eventStart[1]}
                    </div>
                    <div className="thumb" style={this.imageStyle}>&nbsp;</div>
                    <div className="grad"/>
                    <div className="article-copy">
                        <h4>
                            {this.props.eventTitle}
                        </h4>
                        <p>
                            {this.props.eventStart[0]} {this.props.eventStart[1]} {this.props.eventStart[2]}
                        </p>
                    </div>
                </Link>
            </article>
        )
    }
}
export default withRouter(EventPreview)