import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
            return (
                <footer>
                    <div className="container">
                        <div className="row">
                        <div className="col-sm col-sm-4 text-left">
                            <img className="logo" src="/assets/img/cafe_octane.png"/>
                        </div>
                        <div className="col-sm col-sm-4 text-left">
                            <ul>
                                <li><Link to={'/events'}>All events</Link></li>
                                <li><Link to={'/events'}>Cars and Coffee</Link></li>
                                <li><Link to={'/events'}>Motorsport</Link></li>
                                <li><Link to={'/events'}>Car shows</Link></li>
                                <li><Link to={'/events'}>Supercar meets</Link></li>
                            </ul>
                        </div>

                        <div className="col-sm col-sm-4 text-left">
                            <ul>
                                <li><Link to={'/events'}>All events</Link></li>
                                <li><Link to={'/events'}>Cars and Coffee</Link></li>
                                <li><Link to={'/events'}>Motorsport</Link></li>
                                <li><Link to={'/events'}>Car shows</Link></li>
                                <li><Link to={'/events'}>Supercar meets</Link></li>
                            </ul>
                        </div>
                        </div>
                        <div className="row col-sm col-sm-12">
                            <p className="copyright text-left">
                                &copy; Cafe Octane 2018 | <a href="http://www.tom-jordan.co.uk">Tom Jordan</a>
                            </p>
                        </div>
                </div>
                </footer>
            )
}
export default Footer;