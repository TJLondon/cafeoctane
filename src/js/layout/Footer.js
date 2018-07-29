import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
        render() {
            return (
                <footer>
                    <div className="container">

                        <div className="col-md-4">
                            <img className="logo" src="/assets/img/cafe_octane.png"/>
                            <p className="copyright">
                                Copyright Cafeoctane 2018
                            </p>
                        </div>

                        <div className="col-md-4 text-left">
                            <ul>
                                <li><Link to={'/events'}>All events</Link></li>
                                <li><Link to={'/events'}>Cars and Coffee</Link></li>
                                <li><Link to={'/events'}>Motorsport</Link></li>
                                <li><Link to={'/events'}>Car shows</Link></li>
                                <li><Link to={'/events'}>Supercar meets</Link></li>
                            </ul>
                        </div>

                        <div className="col-md-4 text-left">
                            <ul>
                                <li><Link to={'/events'}>All events</Link></li>
                                <li><Link to={'/events'}>Cars and Coffee</Link></li>
                                <li><Link to={'/events'}>Motorsport</Link></li>
                                <li><Link to={'/events'}>Car shows</Link></li>
                                <li><Link to={'/events'}>Supercar meets</Link></li>
                            </ul>
                        </div>



                </div>
                </footer>
            )
        }
}