import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

import './../sass/main.scss';
import SearchResults from './pages/SearchResults';

const app = document.getElementById('app');

const Routing = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/events/' component={SearchResults} />
            <Route path='/events/:id' component={SearchResults} />
        </Switch>
    </main>
)



ReactDOM.render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>,
    app);