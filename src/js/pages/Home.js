import Layout from '../layout/Layout';
import React from 'react';
import TrendingEvents from '../components/searchresults/TrendingEvents';
import ReactDOM from 'react-dom';

import Search from '../components/Search';


export default class Home extends React.Component {
    render() {
        return (
            <Layout>
                <div className='home'>
                    <div className="container">
                        <div className="billboard">
                            <h1>Let's get you a fix</h1>
                            <h2>The best car events, near you</h2>
                             <Search />
                        </div>

                    </div>
                </div>
                <div className="content billboard">
                    <div className="container">
                        <div className="row text-left">
                            <h3>Trending</h3>
                                <TrendingEvents />
                        </div>
                            <div className="row text-left">
                                <h3>Upcoming</h3>
                                <div className="col-md-4">

                                </div>
                            </div>

                            <div className="row text-left">
                                <h3>Recently viewed</h3>
                                <div className="col-md-4">

                                </div>
                            </div>

                    </div>
                </div>
            </Layout>
        )
    }
}