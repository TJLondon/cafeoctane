import React from "react";
import ReactDOM from "react-dom";
import Header from "./pages/Header";
import Content from "./pages/Content";
import Footer from "./pages/Footer";
import './sass/main.scss';


class Index extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
};

ReactDOM.render(<Index />, document.getElementById("index"));