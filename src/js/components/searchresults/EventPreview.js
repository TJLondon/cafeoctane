import React from 'react';
import {Link} from 'react-router-dom';

const EventPreview = (props) => {
    // d1 = this.props.event.eventStart.split("/");
    // date = new Date(this.d1[0], this.d1[1], this.d1[2]);

    let imageStyle = {
        backgroundImage: 'url(/assets/img/event_thumb.jpg)'
    };
        return (
                <article>
                    <a href="/register" className="bookmark">
                        <i className="material-icons">bookmark_border</i>
                    </a>

                    <Link to={'/events/' + props.id}>

                        <div className="thumb" style={imageStyle}></div>
                        <div className="grad" />
                        <div className="article-copy">
                            <h3>
                                { props.eventTitle }
                            </h3>
                            <p>
                                {props.eventStart}
                            </p>
                        </div>
                    </Link>
                </article>
                )
};
export default EventPreview