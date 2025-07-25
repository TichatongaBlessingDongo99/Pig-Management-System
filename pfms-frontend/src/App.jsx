import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NotFound from './pages/NotFound';
import Farms from './components/Farms/Farms';
import Pigs from './components/Pigs/Pigs';
import Health from './components/Health/Health';
import Feeding from './components/Feeding/Feeding';
import Navigation from './components/Shared/Navigation';

const App = () => {
    return (
        <Router>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/farms" component={Farms} />
                <Route path="/pigs" component={Pigs} />
                <Route path="/health" component={Health} />
                <Route path="/feeding" component={Feeding} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
