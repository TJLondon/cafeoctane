import HomeHeroSearch from './HomeHeroSearch';
import Layout from '../common/layout/Layout';
import React from 'react';
import CarouselWidget from '../searchresults/CarouselWidget';

const Home = (props) => {

        const RecentlyViewed = () => {
            if (document.cookie.indexOf("usertoken") > 0) {
                return (
                    <div className="row text-left">
                        <h3>Recently viewed</h3>
                        <CarouselWidget limit={3} category="trending"/>
                    </div>
                )
            }
            else {
                return ''
            }
        }

        return (
            <Layout>
                <div className='home'>
                    <div className="container">
                        <div className="billboard">
                            <h1>Find your next hit</h1>
                            <h2>The best car events, near you</h2>
                             <HomeHeroSearch />
                        </div>
                    </div>
                </div>
                <div className="content billboard">
                    <div className="container">
                        <div className="row text-left">
                            <h3>Trending</h3>
                                <CarouselWidget limit={3} category="trending" />
                        </div>
                            <div className="row text-left">
                                <h3>Upcoming</h3>
                                    <CarouselWidget limit={3} category="upcoming" />
                            </div>
                            <RecentlyViewed />
                    </div>

                    <div className="stripe dark">
                    </div>

                    <div className="stripe">
                    </div>
                </div>
            </Layout>
        )
}

export default Home