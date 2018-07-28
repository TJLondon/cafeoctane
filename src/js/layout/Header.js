import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Header extends React.Component {
    state = {
        user: null
    };

    componentDidMount() {
        axios.get('/auth/user')
            .then(res => {
                const data = res.data;
                if (data.email) {
                    this.setState({user: data})
                }
            })
    }

    isLoggedIn() {
        if (this.state.user) {
            return (
                <div className="avatar">
                    <Link to="/user"><img width="50" src={this.state.user.avatar} /></Link>
                </div>
            )
        }
        else {
            return (
                <div>
                    <a href="/auth/login/facebook"> Sign up</a>
                </div>
            )
        }
    }



    render() {
        return (
            <div>
                <nav className="navbar">
                    <img className="logo" src="/assets/img/cafe_octane.png" />

                    <ul className="navigation">
                        <li>
                            <Link to={'/events/'}>Event Search</Link>
                        </li>
                        <li>
                            <Link to={'/events/'}>Event organisers</Link>
                        </li>
                        <li>
                            {this.isLoggedIn()}
                        </li>
                    </ul>

                </nav>
            </div>
        )
    }
}

