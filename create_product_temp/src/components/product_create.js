import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class ProductCreate extends Component {
    constructor(props){
        super()
        this.state = {
            file: '',
            product_image_preview: ''
        }
    }

    changeNameFromInput = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitForm = (e) => {
        e.preventDefault();
        var $form = document.getElementById('createForm');
        var formData = new FormData($form);

        // var $file = document.getElementById('file_input').files[0]
        // formData.append('product_image', $file)

        console.log('===', JSON.stringify(this.state) )

        let url = '/';

        axios({
            method: 'POST',
            url: url,
            data:formData,
        })
        .then(function (response) {
            console.log('response', response)
        });
    }

    _handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                product_image_preview: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let {product_image_preview} = this.state;
        let $imagePreview = null;
        if (product_image_preview) {
            $imagePreview = (<img src={product_image_preview} style={{'maxWidth':'80px','maxHeight':'80px'}} />);
        }

        return (
            <div>
                <div className="ui grid stackable">
                    <div className="ten wide column">
                        <h1>Product Create</h1>
                        <form id="createForm" className="ui form" onSubmit={this.submitForm.bind(this[0])}>
                            <div className="field">
                                <label>Product Image</label>
                                <input type="file" id="file_input" name="file" onChange={this._handleImageChange} />
                            </div>
                            <div className="two fields">
                                <div className="field">
                                    <label>Product Name</label>
                                    <input type="text" name="product_name" value={this.state.product_name} onChange={this.changeNameFromInput}  />
                                </div>
                                <div className="field">
                                    <label>Product BarCode</label>
                                    <input type="text" name="product_barcode" value={this.state.product_barcode} onChange={this.changeNameFromInput} />
                                </div>
                            </div>
                            <div className="two fields">
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
                        </form>
                    </div>
                    <div className="six wide column">
                        <h1>Preview</h1>
                        <table className="ui celled table">
                            <tbody>
                            {
                                Object.keys(this.state).map( (key, index) => {
                                    if(key == 'product_image_preview'){
                                        console.log('ss')
                                        return <tr>
                                            <td style={{'textTransform':'capitalize'}}><strong>{key.replace(/_/g, ' ')}</strong></td>
                                            <td>{$imagePreview}</td>
                                        </tr>
                                    }else if(key != 'file') {
                                        return <tr key={index}>
                                            <td style={{'textTransform':'capitalize'}}><strong>{key.replace(/_/g, ' ')}</strong></td>
                                            <td>{this.state[key]}</td>
                                        </tr>
                                    }
                                })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCreate;
