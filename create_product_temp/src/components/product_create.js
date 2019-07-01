import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ProductCreate extends Component {
    constructor(props){
        super()
        this.state = {

        }
    }

    submitForm = (e) => {
        e.preventDefault();
        var $form = document.getElementById('createForm');
        let data = new FormData($form);
        axios.post('/products', data)
        .then(res=>{
            console.log('res', res.data.status)

            if(res.data.status == "success"){
                this.props.history.push('/products')
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Product Create</h1>
                <form id="createForm" className="ui form" onSubmit={this.submitForm}>
                    <div className="three fields">
                        <div className="field">
                            <label>Product Name</label>
                            <input type="text" name="product_name"/>
                        </div>
                        <div className="field">
                            <label>Product BarCode</label>
                            <input type="text" name="product_barcode"/>
                        </div>
                        <div className="field">
                            <label>Product Price</label>
                            <input type="text" name="product_price"/>
                        </div>
                        <div className="field">
                            <label>Product Image</label>
                            <input type="file" name="product_image"/>
                        </div>
                    </div>
                    <div className="ui divider"></div>
                    <div className="field">
                        <center>
                            <button className="ui button green icon labeled blue" >
                                <i className="icon check"></i>
                                Submit
                            </button>
                        </center>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductCreate;
