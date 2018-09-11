import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from "react-router-dom";

class BurgerNav extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            hidden: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    showSettings (event) {
        event.preventDefault();
    }


    toggleMenu() {
        if (this.state.isOpen === false) {
            this.state.isOpen= true;
        }
    }

    isMenuOpen = (state) => {
        return this.state.isOpen;
    };

    userNav() {
        if (typeof window !== 'undefined' && document.cookie.indexOf("usertoken")) {
            return (
                <div>
                <li><a href="/profile">Profile <i className="material-icons">keyboard_arrow_right</i></a></li>
                <li><a href="/bookmarks">Your Bookmarks <i className="material-icons">keyboard_arrow_right</i></a></li>
                <li><a href="/user/signout" className="logout">Logout</a></li>
                </div>
            )
        }
        else {
            return (
                <li><Link to={'/register'}>Login or Signup <i className="material-icons">keyboard_arrow_right</i></Link></li>
            )
        }
    }

    render () {
        return (
            <div className="burgerWrap">
                <Menu right onStateChange={ this.isMenuOpen }>
                    <ul>
                        <li><a href={'/'}>Home <i className="material-icons">keyboard_arrow_right</i></a></li>
                        <li><a href={'/events'}>Event Search <i className="material-icons">keyboard_arrow_right</i></a></li>
                        <li><a target="_blank" href='https://cafeoctane.typeform.com/to/UFhEcw'>Event Organisers <i className="material-icons">keyboard_arrow_right</i></a></li>

                        {this.userNav()}
                        {/*<li><a href={'/about'}>About <i className="material-icons">keyboard_arrow_right</i></a></li>*/}
                    </ul>

                    <h2>Contact</h2>
                    <ul className="contactInfo">
                        <li><a href="mailto:contact@cafeoctane.com">contact@cafeoctane.com <i className="material-icons">email</i></a></li>
                    </ul>
                </Menu>
            </div>
        );
    }
}

export default BurgerNav