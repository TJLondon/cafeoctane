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
    }

    render () {
        return (
            <div className="burgerWrap">
            <Menu right onStateChange={ this.isMenuOpen }>
                <ul>
                    <li><Link to={'/'}>Home <i className="material-icons">keyboard_arrow_right</i></Link></li>
                    <li><Link to={'/events'}>Event Search <i className="material-icons">keyboard_arrow_right</i></Link></li>
                    <li><Link to={'/organisers'}>Event Organisers <i className="material-icons">keyboard_arrow_right</i></Link></li>
                    <li><Link to={'/login'}>Login or Signup <i className="material-icons">keyboard_arrow_right</i></Link></li>
                    <li><Link to={'/about'}>About <i className="material-icons">keyboard_arrow_right</i></Link></li>
                </ul>

                <h2>Contact</h2>
                <ul className="contactInfo">
                    <li><a href="mailto:contact@cafeoctane.com">contact@cafeoctane.com <i className="material-icons">email</i></a></li>
                    <li><a href="tel:0800 808 808">0800 808 808 <i className="material-icons">call</i></a></li>
                </ul>

            </Menu>
            </div>
        );
    }
}

export default BurgerNav