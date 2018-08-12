import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import BurgerNav from '../components/navigation/BurgerNav';

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        user: null,
        activeClass: 'top'
    };

    componentDidMount() {
        let cssClass;

        axios.get('/auth/user')
            .then(res => {
                const data = res.data;
                if (data.email) {
                    this.setState({user: data})
                }
            });

        window.addEventListener('scroll', (event) => {
            if(window.scrollY > 20){
                cssClass = 'move';
            }
            else
            {
                cssClass = 'top';
            }
            this.setState({
                activeClass: cssClass
            })
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
                    <a href="/register">Sign up</a>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <BurgerNav/>
                <nav className={'navbar ' + this.state.activeClass + ' ' + (location.pathname === '/' ? 'home' : 'content') }>
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