import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductList extends Component {
  render() {
    return (
        <div>
            <h1>Product List</h1>
            <Link to="/products/create" className="ui button green">Create Product</Link>
        </div>
    )
  }
}

export default ProductList;
