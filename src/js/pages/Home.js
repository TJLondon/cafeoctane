import Layout from '../layout/Layout';
import React from 'react';
import ReactDOM from 'react-dom';

import Search from '../components/Search';


export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
            <Layout>
                    <div className="container">
                        <div className="billboard">
                            <h1>Let's get you a fix</h1>
                            <h2>The best car events, near you</h2>
                             <Search />
                        </div>
                 </div>
            </Layout>
            </div>
        )
    }
}