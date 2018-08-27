import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import './../sass/main.scss';
import SearchResults from './searchresults/SearchResults';
import EventDetails from './searchresults/EventDetails';
import About from './pages/About';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import Bookmarks from './pages/Bookmarks.';

const app = document.getElementById('app');

const Routing = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/events/' component={SearchResults} />
            <Route exact path='/events/find/:category' component={SearchResults} />*
            <Route exact path='/events/trending' component={SearchResults} />
            <Route path='/event/:title/:id' component={EventDetails} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/profile' component={UserProfile} />
            <Route exact path='/bookmarks' component={Bookmarks} />
            <Route exact path='/about' component={About} />
        </Switch>
    </main>
);

ReactDOM.render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>,
    app);