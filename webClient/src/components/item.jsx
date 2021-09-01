import React, { Component } from 'react';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import deleteLogo from '../extraImages/delete2.png';

class Item extends Component {
    state = {
        name: this.props.initName,
        qty: this.props.qty,
        bought: false,
        //qty: this.props.qty,
        //qtyMax: this.props.qtyMax,
    }   
    
    render() {
        let badgeClasses = "badge m-1 badge-primary btn-border-radius btn-border-radius-sm ";
        
        // for conditionally rendering this item's delete button
        // (dependent on whether or not currently in profile)
        const renderDeleteButton = () => {
            if (this.props.canEdit) {
                return <button
                        className="btn btn-sm m-1 btn-light" 
                        onClick={() => this.props.onDelete(this.props.id)}> 
                            <img src={deleteLogo} width="30" height="30"/>
                        </button>;
            }
            return <br/>;
        }

        // for conditionally rendering this item's "bought" button
        // (dependent on whether or not currently in profile)
        const renderBoughtButton = () => {
            if (this.props.canEdit) {
                return <input type="checkbox"
                        checked={this.props.bought}
                        className="regular-checkbox"
                        onClick={(event) => 
                            {this.props.onUpdate(this.state.name, this.props.id, this.state.qty, event.target.checked)}}
                        />
            }
            return <br/>;
        }
        
        

        return(
            <div>
                <div className={badgeClasses} style={{padding: '10px', fontSize: '16px', backgroundColor: "#343644"}}>
                    <div className="top">  
                        <EditText 
                            defaultValue={this.state.name} 
                            placeholder={this.props.defaultName}
                            readonly={!this.props.canEdit}
                            style={{
                                //'whiteSpace': 'nowrap',
                                'align-self': 'center',
                                'flex-direction': 'row',
                                'text-align': 'center',
                                'align-content': 'flex-middle',}}
                            onSave={(data) => {this.props.onUpdate(data.value, this.props.id, this.state.qty, this.state.bought)}}
                        />
                            {renderDeleteButton()}
                            {renderBoughtButton()}
                    </div>
                    <div>
                    <span> Quantity: </span>
                    <EditText
                            inline='true'
                            className="up-right"
                            defaultValue={this.state.qty}
                            readonly={!this.props.canEdit}
                            type="number"
                            onSave={(data) => this.props.onUpdate(this.state.name, this.props.id, data.value, this.state.qtyMax)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

/* Old code from when I was still using X qty / Y qtyMax bought
<span className="top">
    <EditText
        inline='true'
        className="up-right"
        defaultValue={this.state.qty}
        readonly={!this.props.canEdit}
        type="number"
        onSave={(data) => this.props.onUpdate(this.state.name, this.props.id, data.value, this.state.qtyMax)}
        />
    out of
    <EditText 
        inline='true'
        className="up-right"
        defaultValue={this.state.qtyMax}
        readonly={!this.props.canEdit}
        type="number"
        onSave={(data) => this.props.onUpdate(this.state.name, this.props.id, this.state.qty, data.value)}
        />  
</span>
*/


export default Item;
