import BurgerNav from '../navigation/BurgerNav';
import CookieBanner from './CookieBanner';
import { Link } from "react-router-dom";
import React from 'react';
import UserNav from '../navigation/UserNav';
import Cookies from 'universal-cookie';

const noop = () => {};
const cookies = new Cookies();

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            userNav: false
        };

        this.userNavToggle = this.userNavToggle.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {

    }

    userNavToggle(e) {
        e.preventDefault();
        this.state.userNav ? this.setState({userNav: false}) : this.setState({userNav: true})
    }

    isLoggedIn() {
        if (document.cookie.indexOf("usertoken") > 0) {
            return (
                <div className="avatar">
                    <a href="/profile" onClick={this.userNavToggle}><img width="50" src={cookies.get('avatar')} /></a>
                    {this.state.userNav ? <UserNav />: null}
                </div>
            )
        }
        else {
            return (
                <div><ul>
                        <li><a href="#">Organisers</a></li>
                        <li><a href="/register">Sign up <i className="material-icons">person</i> </a></li>
                    </ul>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <BurgerNav />
                <nav className={'navbar top ' + (location.pathname === '/' ? 'home' : 'content') }>
                    <Link to={'/'}>
                        <img className="logo" src="/assets/img/cafe_octane.png" />
                    </Link>
                    <ul className="navigation">
                        <li>
                            {this.isLoggedIn()}
                        </li>
                    </ul>
                </nav>
                <CookieBanner />
            </div>
        )
    }
}

export default Header