import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './home/Home';
import './../sass/main.scss';
import SearchResults from './searchresults/SearchResults';
import EventDetails from './searchresults/EventDetails';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Register from './user/Register';
import UserProfile from './user/UserProfile';
import Bookmarks from './user/Bookmarks.';

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
            <Route exact path='/privacy' component={Privacy} />
            <Route exact path='/terms' component={Terms} />
        </Switch>
    </main>
);

ReactDOM.render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>,
    app);

export default Routing