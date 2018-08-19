import {Link, withRouter} from 'react-router-dom';
import React from 'react';
import axios from "axios";

class Bookmark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarks: null,
            user: null,
            active: ''
        };

        this.bookmarkEvent = this.bookmarkEvent.bind(this);
    }

    componentDidMount() {
        if (this.props.bookmarks && this.props.bookmarks.includes(this.props.eventId)) {
            this.setState({active: 'active'});
        }
    }

    remove = (arr) => {
        const index = arr.indexOf(this.props.eventId);
        console.log(index);
        if (index !== -1) {
            arr.splice(index, 1);
        }
        return arr
    };

    addBookmark() {
        if (this.state.active === 'active') {
            console.log(this.remove(this.props.bookmarks));
            let updatedBookmarks = this.remove(this.props.bookmarks);
            this.setState({active: ''}, () => {
                axios.post('user/bookmark/remove', {
                    bookmarks: updatedBookmarks
                }).then(res => {console.log(res)})
            })

        }
        else {
            this.setState({active: 'active'}, () => {
                axios.post('/user/bookmark/add', {
                    eventid: this.props.eventId
                }).then(res => {this.props.bookmarks.push(this.props.eventId)
                }).catch(error => {console.log(error) });
            });

        }
    }

    bookmarkEvent = (e) => {
        e.preventDefault();
        !this.props.user ? this.props.history.push('/register') : this.addBookmark();
    };

    render() {
        return (
            <a href="/register" onClick={this.bookmarkEvent} className={'bookmark ' + this.state.active}>
                <i className="material-icons">bookmark_border</i>
            </a>
        )
    }
}

export default withRouter(Bookmark);