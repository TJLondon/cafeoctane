import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

const Layout = (props) => {
        return (
            <div className="layout">
                <Header />
                {props.children}
                <Footer />
            </div>
        )
};

export default withRouter(Layout)