import React from "react";

import Layout from "../pages/Layout";
import Search from "../components/Search";

export default class Home extends React.Component {
    render() {
        return (
            <div>
            <Layout>
                <div className="hero">
                    <h1>Boom</h1>
                    <Search />
                </div>
            </Layout>
            </div>
        )
    }
}