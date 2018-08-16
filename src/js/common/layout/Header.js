import axios from 'axios';
import BurgerNav from '../navigation/BurgerNav';
import { Link } from "react-router-dom";
import React from 'react';
import SearchWidget from '../../common/SearchWidget';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.showSearch = this.showSearch.bind(this);

        this.state = {
            user: null,
            activeClass: 'top',
            searchWidget: false
        };
    }

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
            event.preventDefault();
            window.scrollY > 20 ? cssClass = 'move' : cssClass = 'top';
            this.setState({
                activeClass: cssClass
            })
        });

        window.scrollTo(0, 0);
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
                {this.state.searchWidget ? <SearchWidget handler={this.showSearch} /> : null }

                <BurgerNav/>

                <nav className={'navbar ' + this.state.activeClass + ' ' + (location.pathname === '/' ? 'home' : 'content') }>
                    <Link to={'/'}>
                        <img className="logo" src="/assets/img/cafe_octane.png" />
                    </Link>
                    <ul className="navigation">
                        <li>
                            <a href="#" onClick={this.showSearch}>Event Search</a>
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