import axios from 'axios';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
import Layout from '../common/layout/Layout';
import querySearch from "stringquery";
import React from 'react';

const noop = () => {};
export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            pages: 1,
            page: 1,
            user: null,
            bookmarks: null,
            results: 0,
            error: null,
            loading: true
        };

        this.loadMore = this.loadMore.bind(this);
        this.handleUserSuccess = this.handleUserSuccess.bind(this);
        this.handleEventsSuccess = this.handleEventsSuccess.bind(this);
    }

    getUser = () => {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (axios.get('/auth/user'))
        }
        else {
            return null
        }
    };

    getEvents = () => {
        let obj = querySearch(this.props.location.search),
            url = '/api/events'
                + '/geo/3/' + this.state.page
                + '?lng=' + obj.lng
                + '&lat=' + obj.lat
                + '&radius=' + obj.radius;
        return (
            axios.get(url)
        )
    };

    componentDidMount() {
            let handleUserSuccess = this.handleUserSuccess,
                handleEventsSuccess = this.handleEventsSuccess;

            axios.all([this.getUser(), this.getEvents()])
                .then(axios.spread(function (user, events) {
                    handleEventsSuccess(events.data);
                    handleUserSuccess(user.data);

                }))
                .catch(error => {
                    this.handleEventsError(error);
                });
    }

    componentWillUnmount() {
        this.handleUserSuccess = noop;
        this.handleUserError = noop;
        this.handleEventsSuccess = noop;
        this.handleEventsError = noop;
    }

    handleUserSuccess(data) {
        if (data[0].email) {
            this.setState({user: data[0], bookmarks: data[1]})
        }
    }

    handleUserError = error => {
        this.setState({error })
    };

    handleEventsSuccess(events) {
        this.setState({
            events: this.state.events.concat(events[0]),
            pages: events[1].pages,
            results: events[1].results,
            loading: false });
    }

    handleEventsError = error => {
        this.setState({error })
    };

    loadMore() {
            this.setState({page: this.state.page + 1}, () => {
                this.getEvents()
                    .then(res => this.handleEventsSuccess(res.data))
                    .catch(error => this.handleEventsError(error));
            })
    }

    CurrentView() {
        if (Object.keys(this.state.events).length > 0) {
            return (
                <div>
                    <h2 className="resultsCount">{this.state.results} events found</h2>
                    <div className="article-list">
                        {Object.keys(this.state.events).map((eventId) =>
                                    <EventPreview
                                        key={eventId}
                                        user={this.state.user}
                                        bookmarks={this.state.bookmarks}
                                        eventId={this.state.events[eventId]._id}
                                        eventTitle={this.state.events[eventId].eventTitle}
                                        eventStart={Helpers.transformDate( this.state.events[eventId].eventStart) }
                                    />
                        )}
                    </div>
                    {this.state.pages > 1 && this.state.pages !== this.state.page ?<div className="moreContainer"> <button onClick={this.loadMore}>Show More</button> </div>: null }
                </div>
            )
        }

        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="material-icons loading">local_car_wash</i>
                </div>
            )
        }

        else if (Object.keys(this.state.events).length === 0 && this.state.loading === false) {
            return (
                <div className="box">
                    <h2>Dang it! We don't have <br />any events in that area</h2>

                    <p><a className="cta" href="">Suggest an event to us</a></p>
                    <p>or</p>
                    <p><a className="cta" href="/">Search again</a></p>
                </div>
            )
        }
    }

    render() {
        return (
            <Layout>
                <div className="content">
                    <div className="container">
                        {this.CurrentView()}
                    </div>
                </div>
            </Layout>
        )
    }
}