import React, { Component } from 'react';
import {Logo} from '../components/general_components';
import {NavLink} from 'react-router-dom';

class Navigation extends Component {
    render() {
        return (
            <div className="ui stackable inverted menu fluid">
                <NavLink activeClassName="noactive" className="item green " exact to="/"><Logo/></NavLink>
                <NavLink activeClassName="active" className="item red" exact to="/" >Home</NavLink>
                <NavLink activeClassName="active" className="item red"  to="/products" >Products</NavLink>
            </div>
        )
    }
}

export default Navigation;
