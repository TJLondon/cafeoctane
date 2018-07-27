import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Header extends React.Component {
    state = {
        user: null
    }


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
                        <p>
                            Logged In as {this.state.user.email}
                            <img width="50" src={this.state.user.avatar} />
                        </p>
                    )
                }
                else {
                    return (
                        <div>
                        <p>not logged in</p>
                        <Link onClick={window.open('/auth/login/facebook')}> Login with Facebook</Link>
                        </div>
                    )
                        }
        }

    render() {
        return (
            <header>
                <h1>Header</h1>
                {this.isLoggedIn()}
            </header>
        )
    }
}