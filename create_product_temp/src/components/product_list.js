import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super()
        this.state = {
            products:[],
        }
    }
    componentDidMount(){
        axios.get('/products').then(res=>{
            this.setState({
                products:res.data
            })
        })
    }

    deleteProduct = (e)=>{
        console.log('id delete', e)
        axios.delete('/products/'+e).then(res=>{
            console.log('res', res)
            if(res.data.status == "success"){
                window.location.reload();
            }
        })
    }

    render() {
        console.log('productss====', this.state.products)
        const {headers} = this.state.products
        const {data} = this.state.products
        console.log('this==', this.state.products)
        return (
            <div>
                <div className="ui clearing header top attached segment">
                    <h1 className="ui left floated header"  style={{"marginBottom":"0px"}}>Product List</h1>
                    <div className="ui right floated header">
                        <Link to="/products/create" className="ui button green">Create Product</Link>
                    </div>
                </div>

                <div className="ui bottom attached segment">
                    {headers == null || data == null?<div className="ui loader active"></div>:
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                {
                                    Object.keys(data[0]).map((header, index)=>{
                                        return (
                                            ( (header != '_id')
                                                ?
                                                    <th key={index} style={{"textTransform":"capitalize"}}>{header.replace(/_/g, ' ')}</th>
                                                : ''
                                            )
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {


                                data.map((row, index)=>{
                                    return <tr key={index}>
                                        {
                                            Object.keys(row).map((col_key, index) => {
                                                    var dataList = row[col_key].split('.')
                                                    return (
                                                        ( (col_key != '_id')
                                                        ? <td>
                                                                {
                                                                    ( ( dataList.indexOf('jpg') != -1 || dataList.indexOf('png') != -1  )
                                                                        ?
                                                                            <img src={row[col_key]} alt="image" style={{"maxWidth":"80px", "maxHeight":"80px"}} />
                                                                        :
                                                                            row[col_key]
                                                                    )
                                                                }
                                                           </td>
                                                        : ''
                                                        )
                                                    )
                                            })
                                        }
                                    </tr>
                                        // return (
                                        //     ( (header != '_id')
                                        //         ?
                                        //             <th key={index} style={{"textTransform":"capitalize"}}>{header.replace(/_/g, ' ')}</th>
                                        //         : ''
                                        //     )
                                        // )

                                })
                                // data.map((porduct, index)=>{
                                //     console.log('porduct', porduct)
                                //     return <tr key={index}>
                                //         {
                                //             Object.keys(porduct).map((obj_key, index)=>{
                                //                 console.log('col_data', index)
                                //                 return <td key={index}>{
                                //                         ((obj_key == 'product_image')? 'hello' : porduct[obj_key])
                                //                     }</td>
                                //             })
                                //         }
                                //     </tr>
                                // })
                                //
                                //
                                }
                            {

                                // data.map(col_data=>(
                                //     <tr key={col_data._id}>
                                //         <td>{col_data.product_name}</td>
                                //         <td>{col_data.product_barcode}</td>
                                //         <td>{col_data.product_price}</td>
                                //         <td style={{"textAlign":"center"}}><img src={col_data.product_image}
                                //         style={{"width":"100px","height":"100px"}} /></td>
                                //         <td style={{"textAlign":"center"}}><button onClick={this.deleteProduct.bind(this, col_data._id)} className="ui red button">Delete</button></td>
                                //     </tr>
                                // )

                                // )
                            }


                        </tbody>
                    </table>

                    }
                </div>
            </div>

        )
    }
}

export default ProductList;
{/* <th style={{"textTransform":"capitalize"}} key={item._id}>
{headers.replace(/_/g, ' ')}
</th> */}
