import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation'
import {WelcomeMessage} from './components/general_components';
import ProductList from './components/product_list';
import ProductCreate from './components/product_create';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navigation/>
            <div className="ui container">
                <Switch>
                    <Route exact path="/" component={WelcomeMessage} />
                    <Route exact path="/products" component={ProductList} />
                    <Route exact path="/products/create" component={ProductCreate} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
