import React from "react";

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
                            <li><a href='/events'>All events</a></li>
                            <li><a href='/events/find/cars-and-coffee'>Cars and Coffee</a></li>
                            <li><a href='/events/find/motorsport'>Motorsport</a></li>
                            <li><a href="/events/find/car-shows">Car shows</a></li>
                        </ul>
                    </div>

                    <div className="col-sm col-sm-3 text-right">
                        <ul>
                            <li><a href='/events/find/supercar-meets'>Supercar meets</a></li>
                            <li><a href='/events/find/american'>American</a></li>
                            <li><a href='/events/find/japanese-and-imports'>Japanese/Imports</a></li>
                            <li><a href='/events/find/track-days'>Track Days</a></li>
                        </ul>
                    </div>

                    <div className="col-sm col-sm-3 text-left social">
                        <ul>
                            <li><a href="https://www.facebook.com/Cafe-Octane-235678193766150" target="_blank" className="fa fa-facebook"></a>&nbsp;<a href="https://www.instagram.com/cafeoctane/" target="_blank" className="fa fa-instagram"></a>
                                {/*&nbsp;<a href="#" className="fa fa-twitter"></a>*/}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row col-sm col-sm-12">
                    <ul className="copyright text-left">
                        <li>&copy; Cafe Octane 2018 </li>
                        <li>by <a href="http://www.tom-jordan.co.uk" target="_blank">Tom Jordan</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        {/*<li><a href="/terms">Terms</a></li>*/}
                    </ul>
                </div>
            </div>
        </footer>
    )
};
export default Footer;