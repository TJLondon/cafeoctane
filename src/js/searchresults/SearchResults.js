import axios from 'axios';
import { DateRange } from 'react-date-range';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
import Layout from '../common/layout/Layout';
import moment from 'moment';
import querySearch from "stringquery";
import React from 'react';
import SearchWidget from '../common/SearchWidget';
require('es6-promise').polyfill();

const noop = () => {};
export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsperpage: 3,
            events: [],
            pages: 1,
            page: 1,
            user: null,
            bookmarks: null,
            results: 0,
            error: null,
            loading: true,
            calendar: '',
            filters: {
                lng: '-1.477870',
                lat: '53.332780',
                radius: '1000',
                dateStart: moment().startOf('day').toISOString(),
                dateEnd: moment().add(1, 'year').toISOString(),
                category: ''
            }
        };

        this.loadMore = this.loadMore.bind(this);
        this.handleUserSuccess = this.handleUserSuccess.bind(this);
        this.handleEventsSuccess = this.handleEventsSuccess.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }


    handleUserSuccess(data) {
        if (data[0].email) {
            this.setState({user: data[0], bookmarks: data[1]});
        }
    }

    handleUserError = error => {
        this.setState({error })
    };

    getUser = () => {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (axios.get('/user/get'))
        }
        else {
            return this.state.user
        }
    };

    handleEventsSuccess(events) {
        this.setState({
            events: this.state.events.concat(events[0]),
            pages: events[1].pages,
            results: events[1].results,
            loading: false
        });
    }

    handleEventsError = error => {
        this.setState({error })
    };

    getEvents = () => {
        let url = '/api/events/geo/' + this.state.resultsperpage + '/' + this.state.page,
            query = '?';

        Object.entries(this.state.filters).map((id) => {
            id[1] != null ? query += id[0] + '=' + id[1] + '&' : null;
        });

        return (
            axios.get(url + query)
        )
    };

    componentDidMount() {
        let handleUserSuccess = this.handleUserSuccess,
            handleEventsSuccess = this.handleEventsSuccess;

        let obj = querySearch(this.props.location.search);
        if (obj.lat == null) {
            obj = {lat: this.state.filters.lat, lng: this.state.filters.lng, radius: this.state.filters.radius}
        }
        this.setState({
            filters:
                {
                    lng: obj.lng,
                    lat: obj.lat,
                    radius: obj.radius,
                    dateStart: this.state.filters.dateStart,
                    dateEnd: this.state.filters.dateEnd,
                    category: this.props.match.params.category}}, () => {

                axios.all([this.getUser(), this.getEvents()])
                    .then(axios.spread(function (user, events) {
                        user !== null ? handleUserSuccess(user.data) : null;
                        events !== null ? handleEventsSuccess(events.data) : null;
                    }))
                    .catch(error => { this.handleEventsError(error);})
        });
    };

    componentWillUnmount() {
        this.handleUserSuccess = noop;
        this.handleUserError = noop;
        this.handleEventsSuccess = noop;
        this.handleEventsError = noop;
    }

    loadMore() {
            this.setState({page: this.state.page + 1}, () => {
                this.getEvents()
                    .then(res => this.handleEventsSuccess(res.data))
                    .catch(error => this.handleEventsError(error));
            })
    }

    submitSearch = (results) => {
        this.setState({
            loading: true,
            events: [],
            pages: 1,
            page: 1,
            filters: {
                lng: results.lng,
                lat: results.lat,
                radius: results.radius,
                dateStart: this.state.filters.dateStart,
                dateEnd: this.state.filters.dateEnd,
                category: this.state.filters.category
            }
        }, () => {
            this.getEvents()
                .then(data => this.handleEventsSuccess(data.data));
        });
    };

    handleCalendarSelect = (date) => {
        this.setState({
            filters: {
                lat: this.state.filters.lat,
                lng: this.state.filters.lng,
                radius: this.state.filters.radius,
                dateStart: date.startDate.toISOString(),
                dateEnd: date.endDate.toISOString(),
                category: this.state.filters.category
            }
        });
    };

    handleCalendarSubmit = (e) => {
        e.preventDefault();
            this.setState({
                loading: true,
                events: [],
                pages: 1,
                page: 1
            }, () => {
                this.getEvents()
                    .then(data => this.handleEventsSuccess(data.data));
            });
    };

    toggleCalendar = (e) => {
        e.preventDefault();
        this.state.calendar === '' ? this.setState({calendar: 'calendar-active'}) : this.setState({calendar: ''})
    };

    CurrentView() {
        if (Object.keys(this.state.events).length > 0) {
            return (
                <div className={this.state.calendar}>
                    <button className="calendarToggle" onClick={this.toggleCalendar}>Calendar</button>
                    <h2 className="resultsCount">{this.state.results} events found</h2>

                    <div className="calendarContainer">
                        <DateRange
                            calendars={1}
                            format={'default'}
                            minDate={moment()}
                            onChange={this.handleCalendarSelect}
                        />
                        <button onClick={this.handleCalendarSubmit}>Update</button>
                    </div>


                    <div className="article-list">
                        {Object.keys(this.state.events).map((eventId) =>
                                    <EventPreview
                                        key={eventId}
                                        user={this.state.user}
                                        bookmarks={this.state.bookmarks}
                                        eventId={this.state.events[eventId]._id}
                                        eventCounty={this.state.events[eventId].eventCounty}
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
                <div className="searchresults">
                    <div className="resultsHeader">
                        <SearchWidget handler={this.submitSearch} />
                    </div>
                    <div className="content">
                        <div className="container">
                            { this.CurrentView() }
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}