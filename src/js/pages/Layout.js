import React from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}