import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

class Layout extends React.Component {
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

export default withRouter(Layout)