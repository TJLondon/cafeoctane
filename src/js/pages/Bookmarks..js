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
            view: 'error',
            user: null,
            bookmarks: null,
            optinSuggested: false
        };
            this.handleUserSuccess = this.handleUserSuccess.bind(this);
    }


    handleUserSuccess = (data) => {
        if (data) {
            this.setState({
                bookmarks: data,
                user: '',
                view: 'bookmarks'
            })
        }
    };

    handUserError = (error) => {
        this.setState({view: 'error'}, () => {
            console.log(error);
        });
    };

    componentDidMount() {
        if (document.cookie.indexOf("usertoken") > 0) {
            axios.get('/user/bookmarks')
                .then(res => this.handleUserSuccess(res.data))
                .catch(error => this.handUserError(error));
        }
        else {
            this.props.history.push('/register')
        }
    }

    componentWillUnmount() {
        this.handleUserSuccess = noop;
        this.handUserError = noop;
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

    Updated() {
        return (
            <div className="success">
                <i className="material-icons">check</i>
                <p>Your details have been updated</p>
            </div>
        )
    }

    BookmarksPanel() {
        return (
            <div className="box">
                <h3>Bookmarks</h3>
                {Object.keys(this.state.bookmarks).map((bookmarkId) =>
                        <div>
                            {this.state.bookmarks[bookmarkId].eventTitle}
                        </div>

                )}
            </div>
        )
    }

    render() {
        return (
            <Layout>
                <div className="userprofile content">
                    <div className="container">
                        {this.state.view === 'error' ? this.Error() : null}
                        {this.state.view === 'bookmarks' ? this.BookmarksPanel() : null}
                    </div>
                </div>
            </Layout>
        )
    }



}

export default withRouter(Bookmarks)