import React from 'react';
import {Link} from 'react-router-dom';

const EventPreview = (props) => {
    let imageStyle = {
        backgroundImage: 'url(/assets/img/event_thumb.jpg)'
    };
        return (
                <article>
                    <a href="/register" className="bookmark">
                        <i className="material-icons">bookmark_border</i>
                    </a>

                    <Link to={'/events/' + props.eventId}>

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