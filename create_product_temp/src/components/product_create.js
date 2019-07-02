import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ProductCreate extends Component {
    constructor(props){
        super()
        this.state = {
            product_name: '',
            product_barcode: '',
            product_price: '',

        }
    }
    componentDidMount () {
        const { handle } = this.props.match.params
        axios.get(`/products/get_product/${handle}`)
        .then((res) => {
            this.setState(res.data)
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        var $form = document.getElementById('createForm');
        var $file = document.getElementById('product_image');
        let data = new FormData($form);

        const { handle } = this.props.match.params
        console.log('handle', handle)
        let url = ''
        if(handle) {
            console.log('yes handle', handle)
            url = `/products/${handle}`
        }else {
            console.log('no handle')
            url = '/products'
        }
        axios.post(url, data)
        .then(res=>{
            if(res.data.status == "success"){
                this.props.history.push('/products')
            }
        })
    }
    fieldChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        console.log('thisstate', this.state)
        return (
            <div>
                <h1>Product Create</h1>
                <form id="createForm" className="ui form" onSubmit={this.submitForm}>
                    <div className="three fields">
                        <div className="field">
                            <label>Product Name</label>
                            <input type="text" name="product_name" value={this.state.product_name} onChange={this.fieldChange} />
                        </div>
                        <div className="field">
                            <label>Product BarCode</label>
                            <input type="text" name="product_barcode" value={this.state.product_barcode} onChange={this.fieldChange} />
                        </div>
                        <div className="field">
                            <label>Product Price</label>
                            <input type="text" name="product_price" value={this.state.product_price} onChange={this.fieldChange} />
                        </div>
                        <div className="field">
                            <label>Product Image</label>
                            <input type="file" id="product_image" name="product_image" />
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
