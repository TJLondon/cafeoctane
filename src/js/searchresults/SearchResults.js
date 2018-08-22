import axios from 'axios';
import { DateRange } from 'react-date-range';
import EventPreview from './EventPreview';
import Helpers from '../common/Helpers';
import Layout from '../common/layout/Layout';
import querySearch from "stringquery";
import React from 'react';
import SearchWidget from '../common/SearchWidget';

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
            searchquery: null,
            loading: true,
            calendar: '',
            datePickerStart: null,
            datePickerEnd: null
        };

        this.loadMore = this.loadMore.bind(this);
        this.handleUserSuccess = this.handleUserSuccess.bind(this);
        this.handleEventsSuccess = this.handleEventsSuccess.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    getUser = () => {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (axios.get('/auth/user'))
        }
        else {
            return null
        }
    };

    getEvents = (query) => {
        let obj = querySearch(this.props.location.search),
            url = '/api/events'
                + '/geo/'+ this.state.resultsperpage + '/' + this.state.page;
                if (!query) {
                    query = '?lng=' + obj.lng
                    + '&lat=' + obj.lat
                    + '&radius=' + obj.radius;
                }
                this.setState({searchquery: query});

        return (
            axios.get(url + query)
        )
    };

    componentDidMount() {
        let handleUserSuccess = this.handleUserSuccess,
            handleEventsSuccess = this.handleEventsSuccess;
            axios.all([this.getUser(), this.getEvents()])
                .then(axios.spread(function (user, events) {
                    handleUserSuccess(user.data);
                    handleEventsSuccess(events.data);

                }))
                .catch(error => {
                    this.handleEventsError(error);
                })


    };

    componentWillUnmount() {
        this.handleUserSuccess = noop;
        this.handleUserError = noop;
        this.handleEventsSuccess = noop;
        this.handleEventsError = noop;
    }

    handleUserSuccess(data) {
        if (data[0].email) {
            this.setState({user: data[0], bookmarks: data[1]});
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
            loading: false});
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

    submitSearch = (search) => {
        this.setState({
            loading: true,
            events: [],
            pages: 1,
            page: 1
        }, () => {
            this.getEvents(search)
                .then(data => this.handleEventsSuccess(data.data));
        });
    };

    calendarSwitch = () => {
        console.log('switch')
    };

    handleCalendarSelect = (date) => {
        this.setState({
            datePickerStart: date.startDate.unix(),
            datePickerEnd: date.endDate.unix()
        });
    }

    handleCalendarSubmit = () => {
        if (this.state.datePickerStart != null) {
            let search = this.state.searchquery
                + '&datefrom=' + this.state.datePickerStart
                + '&dateto=' + this.state.datePickerEnd;
            this.setState({
                loading: true,
                events: [],
                pages: 1,
                page: 1
            }, () => {
                this.getEvents(search)
                    .then(data => this.handleEventsSuccess(data.data));
            });
        }
    };

    toggleCalendar = (e) => {
        e.preventDefault();
        this.state.calendar === '' ? this.setState({calendar: 'calendar-active'}) : this.setState({calendar: ''})
    };


    CurrentView() {
        if (Object.keys(this.state.events).length > 0) {
            return (
                <div className={this.state.calendar}>
                    <h2 className="resultsCount">{this.state.results} events found</h2>
                    <div className="calendarContainer">
                        <DateRange calendars={1} format={'default'} onInit={this.handleCalendarSelect} onChange={this.handleCalendarSelect}/>
                        <button onClick={this.handleCalendarSubmit}>Update</button>
                    </div>


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
                <div className="searchresults">
                    <div className="resultsHeader">
                        <SearchWidget calendarswitch={this.calendarSwitch} handler={this.submitSearch} />
                        <a href="#" onClick={this.toggleCalendar}>toggle</a>
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