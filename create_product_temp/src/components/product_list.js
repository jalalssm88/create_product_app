import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class ProductList extends Component {
    constructor(props) {
        super()
        this.state = [
            {
                product_image : "/abc/cac.jpg",
                product_name : "iPhone 5",
                product_barcode : "123456",
                product_price : "350",
            },
            {
                product_image : "/abc/cac.jpg",
                product_name : "iPhone 6",
                product_barcode : "266650",
                product_price : "450",
            },
            {
                product_image : "/abc/cac.jpg",
                product_name : "iPhone Xs Max",
                product_barcode : "2255445",
                product_price : "6000",
            }
        ]
    }

    render() {
        return (
            <div>
                <div className="ui clearing header top attached segment">
                    <h1 className="ui left floated header"  style={{"marginBottom":"0px"}}>Product List</h1>
                    <div className="ui right floated header">
                        <Link to="/products/create" className="ui button green">Create Product</Link>
                    </div>
                </div>
                <table className="ui celled table top attached segment"   style={{"marginTop":"-2px"}}>
                        <thead>
                            <tr>
                                {
                                    Object.keys(this.state[0]).map( values => {
                                        return <th style={{'textTransform':'capitalize'}}>{values.replace(/_/g,' ')}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.map( (obj, index) => {
                                    return <tr data-key={index} key={index}>
                                            {
                                                Object.keys(obj).map( values => {
                                                    return <td>{obj[values]}</td>
                                                })
                                            }
                                        </tr>
                                })
                            }
                            <tr></tr>
                        </tbody>
                    </table>
            </div>

        )
    }
}

export default ProductList;
