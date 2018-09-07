import BurgerNav from '../navigation/BurgerNav';
import CookieBanner from './CookieBanner';
import { Link } from "react-router-dom";
import React from 'react';
import UserNav from '../navigation/UserNav';
import Cookies from 'universal-cookie';

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

    userNavToggle(e) {
        e.preventDefault();
        this.state.userNav ? this.setState({userNav: false}) : this.setState({userNav: true})
    }

    isLoggedIn() {
        if (typeof window !== 'undefined' && document.cookie.indexOf("usertoken") > 0) {
            return (
                <div className="avatar">
                    <a href="/profile" onClick={this.userNavToggle}><img width="50" src={cookies.get('avatar')} /></a>
                    {this.state.userNav ? <UserNav />: null}
                </div>
            )
        }
        else {
            return (
                <div>
                    <a href="/register" className="icon">Sign up <i className="material-icons">person</i> </a>
                </div>
            )
        }
    }

    currentView() {
        let cssClass;
        if (typeof window !== 'undefined') {
            location.pathname === '/' ? cssClass = 'home' : cssClass = 'content';
        }
        else {
            cssClass = 'home'
        }
        return cssClass;
    }

    render() {
        return (
            <div>
                <BurgerNav />
                    <nav className={'navbar top ' + this.currentView() }>
                    <Link to={'/'}>
                        <img className="logo" src="/assets/img/cafe_octane.png" />
                    </Link>
                    <ul className="navigation">
                        <li><a target="_blank" href="https://cafeoctane.typeform.com/to/UFhEcw">Organisers</a></li>
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