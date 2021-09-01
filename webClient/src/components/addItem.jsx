import React, { Component } from 'react';
import addLogo from '../extraImages/plus.ico';

class AddItem extends Component {

    render() {
        return(
            <div>
                <button className="btn btn-outline-primary m-1" onClick={() => this.props.onAdd()}>
                    <span>
                        Add New Item
                        <img src={addLogo} 
                            alt="!"
                            style={{ width: 40, height: 40 }}/>
                    </span> 
                </button>
            </div>
        );
    }
}

export default AddItem;