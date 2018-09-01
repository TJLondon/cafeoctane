import axios from "axios";
import Layout from '../common/layout/Layout';
import React from 'react';
import {withRouter} from 'react-router-dom';
import Helpers from "../common/Helpers";
import EventPreview from "../searchresults/EventPreview";

const noop = () => {}
class Bookmarks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'loading',
            user: null,
            bookmarks: []
        };
            this.handleSuccess = this.handleSuccess.bind(this);
    }

    getUser() {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (axios.get('/user/get'))
        }
        else {
            return this.state.user
        }
    };


    handleSuccess = (data) => {
        if (data) {
            this.getUser()
                .then(res => {
                    this.setState({
                        bookmarks: data,
                        user: res.data,
                        view: 'bookmarks'
                    })
                })

        }
    };

    handleError = (error) => {
        this.setState({view: 'error'}, () => {
            console.log(error);
        });
    };

    componentDidMount() {
        if (document.cookie.indexOf("usertoken") > 0) {
            axios.get('/user/bookmarks')
                .then(res => this.handleSuccess(res.data))
                .catch(error => this.handleError(error));
        }
        else {
            this.props.history.push('/register')
        }
    }

    componentWillUnmount() {
        this.handleSuccess = noop;
        this.handleError = noop;
    }

    Error() {
        return (
            <div className="box">
                <div className="errorPanel">
                    <i className="material-icons">build</i>
                    <p>uh oh. We're having some technical issues</p>
                    <p className="standard"><a href="#">Get in touch</a> and let us know</p>
                </div>
            </div>
        )
    }


    Loading() {
        return (
            <div className="loading">
                <i className="material-icons loading">local_car_wash</i>
            </div>
        )
    }

    BookmarksPanel() {
        let bookmarks = [];
        Object.keys(this.state.bookmarks).map((bookmarkId) => {
            bookmarks.push(this.state.bookmarks[bookmarkId]._id)
        });

        if (Object.keys(this.state.bookmarks).length > 0) {
            return (
                <div className="box">
                    <h3>Bookmarks</h3>

                    <div className="article-list">
                        {Object.keys(this.state.bookmarks).map((bookmarkId) =>
                            <EventPreview
                                key={bookmarkId}
                                user={this.state.user}
                                bookmarks={bookmarks}
                                eventId={this.state.bookmarks[bookmarkId]._id}
                                eventTitle={this.state.bookmarks[bookmarkId].eventTitle}
                                eventCounty={this.state.bookmarks[bookmarkId].eventCounty}
                                eventStart={Helpers.transformDate(this.state.bookmarks[bookmarkId].eventStart)}
                            />
                        )}
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="box">
                    <h3>Bookmarks</h3>
                    <p>
                        You don't have any active events saved right now.
                    </p>
                </div>
            )
        }
    }

    render() {
        return (
            <Layout>
                <div className="bookmarks content">
                    <div className="container">
                        {this.state.view === 'loading' ? this.Loading() : null}
                        {this.state.view === 'error' ? this.Error() : null}
                        {this.state.view === 'bookmarks' ? this.BookmarksPanel() : null}
                    </div>
                </div>
            </Layout>
        )
    }



}

export default withRouter(Bookmarks)