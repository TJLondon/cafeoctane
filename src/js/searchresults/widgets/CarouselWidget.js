import axios from 'axios';
import EventPreview from '../EventPreview';
import Helpers from '../../common/Helpers';
import React from 'react';

const noop = () => {}
export default class CarouselWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: Object,
            error: null,
            user: null,
            bookmarks: null
        };

        this.handleEventsSuccess = this.handleEventsSuccess.bind(this);
        this.handleUserSuccess = this.handleUserSuccess.bind(this);
    }


    handleUserSuccess(data) {
        if (data[0].email) {
            this.setState({user: data[0], bookmarks: data[1]});
        }
    }

    handleUserError = error => {
        this.setState({error })
    };

    getUser() {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (axios.get('/user/get'))
        }
        else {
            return this.state.user
        }
    };

    getEvents() {
        return axios.get('api/events/' + this.props.category + '/' + this.props.limit);
    }

    handleEventsSuccess = (events) => {
        this.setState({ events });
    };

    handleEventsError = (error) => {
        this.setState({ error });
    };

    componentDidMount() {
        let handleEventsSuccess = this.handleEventsSuccess,
            handleUserSuccess = this.handleUserSuccess;

        axios.all([this.getUser(), this.getEvents()])
            .then(axios.spread(function (user, events) {
                user !== null ? handleUserSuccess(user.data) : null;
                events !== null ? handleEventsSuccess(events.data) : null;
            }))
            .catch(error => { this.handleEventsError(error);})
    }

    componentWillUnmount() {
        this.handleUserSuccess = noop;
        this.handleUserError = noop;
        this.handleEventsSuccess = noop;
        this.handleEventsError = noop;
    }

    render() {
        return (
            <div className="article-home">
                {Object.keys(this.state.events).map(eventId =>
                    <EventPreview
                        key={eventId}
                        user={this.state.user}
                        bookmarks={this.state.bookmarks}
                        eventId={this.state.events[eventId]._id}
                        eventTitle={this.state.events[eventId].eventTitle}
                        eventStart={Helpers.transformDate(this.state.events[eventId].eventStart)}
                    />
                )}
            </div>
        )
    }
}