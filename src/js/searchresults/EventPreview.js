import {Link, withRouter} from 'react-router-dom';
import React from 'react';
import Bookmark from "./widgets/Bookmark";

class EventPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            bgImage: '/assets/img/event_thumb.jpg'
        };
    }
    imageStyle = {
            backgroundImage: 'url(/assets/img/events/5b6ef70515320a00169cdb08_goodwood.jpg)'
    };

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

                            <span>{this.props.eventCounty}</span>

                        </p>
                    </div>
                </Link>
            </article>
        )
    }
}
export default withRouter(EventPreview)