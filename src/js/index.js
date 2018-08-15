import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import './../sass/main.scss';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Register from './pages/Register';

const app = document.getElementById('app');

const Routing = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/events/' component={SearchResults} />
            <Route exact path='/events/trending' component={SearchResults} />
            <Route path='/events/:id' component={SearchResults} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/about' component={About} />
        </Switch>
    </main>
)

ReactDOM.render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>,
    app);