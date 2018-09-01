import HomeHeroSearch from './HomeHeroSearch';
import Layout from '../common/layout/Layout';
import React from 'react';
import CarouselWidget from '../searchresults/widgets/CarouselWidget';
import RecentlyViewed from '../searchresults/widgets/RecentlyViewed';
import EventCategories from '../searchresults/widgets/EventCategories';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const Home = (props) => {
        const History = () => {
            if (cookies.get('history')) {
                return (
                <div className="row text-left">
                    <h3>Recently viewed</h3>
                    <RecentlyViewed limit={3}/>
                </div>
                )
            }
            else {
                return null
            }
        };


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
                    </div>
                        <div className="row text-left stripe dark">
                            <div className="container">
                                <h3>Explore by event type</h3>
                                <EventCategories />
                            </div>
                        </div>
                    <div className="container">
                            <div className="row text-left">
                                <h3>Upcoming</h3>
                                    <CarouselWidget limit={3} category="upcoming" />
                            </div>
                        <History />
                    </div>
                </div>
            </Layout>
        )
}

export default Home