import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

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
            });
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
                    <a href="/auth/login/facebook">Sign up</a>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <nav className={'navbar ' + (location.pathname === '/' ? 'home' : 'content')}>
                    <Link to={'/'}>
                        <img className="logo" src="/assets/img/cafe_octane.png" />
                    </Link>

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

export default Header