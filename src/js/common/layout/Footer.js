import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-sm col-sm-3 text-left">
                        <img className="logo" src="/assets/img/cafe_octane.png"/>
                    </div>
                    <div className="col-sm col-sm-3 text-left">
                        <ul>
                            <li><Link to={'/events'}>All events</Link></li>
                            <li><Link to={'/events/find/cars-and-coffee'}>Cars and Coffee</Link></li>
                            <li><Link to={'/events/find/motorsport'}>Motorsport</Link></li>
                            <li><Link to={'/events/find/car-shows'}>Car shows</Link></li>
                        </ul>
                    </div>

                    <div className="col-sm col-sm-3 text-right">
                        <ul>
                            <li><Link to={'/events/events/supercar-meets'}>Supercar meets</Link></li>
                            <li><Link to={'/events/find/american'}>American</Link></li>
                            <li><Link to={'/events/find/japanese-and-imports'}>Japanese/Imports</Link></li>
                            <li><Link to={'/events/find/track-days'}>Track Days</Link></li>
                        </ul>
                    </div>

                    <div className="col-sm col-sm-3 text-left social">
                        <ul>
                            <li><a href="#" className="fa fa-facebook"></a>&nbsp;<a href="#" className="fa fa-instagram"></a>&nbsp;<a href="#" className="fa fa-twitter"></a></li>
                        </ul>
                    </div>


                </div>
                <div className="row col-sm col-sm-12">
                    <p className="copyright text-left">
                        &copy; Cafe Octane 2018 | <a href="http://www.tom-jordan.co.uk" target="_blank">Tom Jordan</a> | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms</a>
                    </p>
                </div>
            </div>


        </footer>
    )
};
export default Footer;