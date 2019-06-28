import React, { Component } from 'react';

export class Logo extends Component {
    render() {
        return (
            <i className="icon stripe" style={{'fontSize':'30px','minWidth':'70px'}}></i>
        )
    }
}


export class WelcomeMessage extends Component {
    render() {
        return (
            <center>
                <br/><br/><br/><br/><br/><br/>
                <h4 style={{"textTransform":"uppercase"}}>Welcome to</h4>
                <h1 style={{"textTransform":"uppercase"}}>Product Creation React App</h1>
            </center>
        )
    }
}
// export default {Logo};
