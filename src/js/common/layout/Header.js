import axios from 'axios';
import BurgerNav from '../navigation/BurgerNav';
import { Link } from "react-router-dom";
import React from 'react';
import UserNav from '../navigation/UserNav';

const noop = () => {};
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            error: null,
            activeClass: 'top',
            userNav: false,
            searchWidget: false
        };
        this.showSearch = this.showSearch.bind(this);
        this.userNavToggle = this.userNavToggle.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.handleUserSuccess = this.handleUserSuccess.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }


    handleUserSuccess(data) {
        if (data[0].email) {
            this.setState({user: data[0]})
        }
    }

    handleUserError(error) {
        this.setState(error)
    }

    handleScroll() {
        let cssClass;
        window.addEventListener('scroll', (event) => {
            event.preventDefault();
            window.scrollY > 20 ? cssClass = 'move' : cssClass = 'top';
            this.setState({
                activeClass: cssClass
            })
        });
        window.scrollTo(0, 0);
    }

    componentDidMount() {
        if (document.cookie.indexOf("usertoken") > 0) {
            axios.get('/auth/user')
            .then(res => this.handleUserSuccess(res.data))
            .catch(error => this.handleUserError(error));
        }
        this.handleScroll();
    }

    componentWillUnmount() {
        this.showSearch = noop;
        this.userNavToggle = noop;
        this.isLoggedIn = noop;
        this.handleUserSuccess = noop;
        this.handleScroll = noop;
    }

    showSearch = (e) => {
        e.preventDefault();
        if (this.state.searchWidget) {
            this.setState({searchWidget: false})
        }
        else {
            this.setState({searchWidget: true})
        }
    };

    userNavToggle(e) {
        e.preventDefault();
        this.state.userNav ? this.setState({userNav: false}) : this.setState({userNav: true})
    }

     isLoggedIn() {
        if (this.state.user) {
            return (
                <div className="avatar">
                    <a href="/profile" onClick={this.userNavToggle}><img width="50" src={this.state.user.avatar} /></a>
                    {this.state.userNav ? <UserNav />: null}
                </div>
            )
        }
        else {
            return (
                <div>
                    <a href="/register">Sign up or Login</a>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <BurgerNav user={this.state.user}/>

                <nav className={'navbar ' + this.state.activeClass + ' ' + (location.pathname === '/' ? 'home' : 'content') }>
                    <Link to={'/'}>
                        <img className="logo" src="/assets/img/cafe_octane.png" />
                    </Link>
                    <ul className="navigation">
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