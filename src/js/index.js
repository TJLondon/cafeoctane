import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./components/Search";

import './../sass/main.scss';

const app = document.getElementById("app");

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={Home} />
    </BrowserRouter>,
    app);