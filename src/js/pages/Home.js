import Layout from '../layout/Layout';
import React from 'react';
import Search from '../components/Search';


export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
            <Layout>
                <div className='hero'>
                    <Search />
                </div>
            </Layout>
            </div>
        )
    }
}