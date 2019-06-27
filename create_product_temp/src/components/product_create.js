import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ProductCreate extends Component {
    constructor(props){
        super()
        this.state = {
            product_name: "iPhone 5",
            product_barcode: "11555225",
            product_price: "1250",
        }
    }

    changeNameFromInput = (event) => {
        this.setState({
            [event.target.name] : [event.target.value]
        })
    }

    onFileChange(e) {
        this.setState({
            product_image: e.target.files[0]})
      }
    submitForm = (e) => {
        e.preventDefault();
        var $form = document.getElementById('createForm');

        console.log('file', this.state.product_image)
        console.log('$form', $form)
        let data = new FormData($form);
        // var $file = document.getElementById('file_input')
        // console.log('$file', $file[0])
        data.append('file', this.state.product_image)
        // console.log('data',data)
        console.log('===', JSON.stringify(data) )

        let url = '/';
        // let data = this.state

        axios({
            method: 'POST',
            url: url,
            data:data,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'stream'
        })
        .then(function (response) {
            console.log('response', response)
        });
    }

    render() {
        return (
            <div>
                <h1>Product Create</h1>
                <form id="createForm" className="ui form" onSubmit={this.submitForm.bind(this[0])}>
                    <div className="three fields">
                        <div className="field">
                            <label>Product Image</label>
                            <input type="file" id="file_input" onChange={this.onFileChange} name="product_image" value={this.state.product_image} onChange={this.changeNameFromInput}  />
                        </div>
                        <div className="field">
                            <label>Product Name</label>
                            <input type="text" name="product_name" value={this.state.product_name} onChange={this.changeNameFromInput}  />
                        </div>
                        <div className="field">
                            <label>Product BarCode</label>
                            <input type="text" name="product_barcode" value={this.state.product_barcode} onChange={this.changeNameFromInput} />
                        </div>
                        <div className="field">
                            <label>Product Price</label>
                            <input type="text" name="product_price" value={this.state.product_price} onChange={this.changeNameFromInput} />
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
                        {JSON.stringify(this.state)}
                    </div>
                </form>
            </div>
        )
    }
}

export default ProductCreate;
