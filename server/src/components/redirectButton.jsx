import React, { Component } from 'react';
import defaultProfilePicture from '../extraImages/defaultPic.ico';
//import PROFILEPICTURE !!! from '../extraImages/plus.ico';
import cartIcon from '../extraImages/shoppingCart.ico';
//ref={require('./extraImages/defaultPic.ico')} to maybe just require it straight from app or something somehow?

class redirectButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageSource: props.text === "Shopping Cart" ? cartIcon : defaultProfilePicture
        }
    }
    render() {
        return(
            <div>
                <a href={this.props.destination} style={{'color':'white'}}>
                    <h2>{this.props.text}
                    <div className="btn btn-outline-primary m-3">
                        <img src={this.state.imageSource} 
                            alt=""
                            style={{ width: 40, height: 40 }} />
                    </div>
                    </h2>
                </a>
            </div>
        );
    }
}

export default redirectButton;