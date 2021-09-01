import React, { Component } from 'react';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class ProfileDataDisplay extends Component {

    state = { 
        userName: null, 
        email: null,
    }


    
    render() {

        let badgeClasses = "badge m-2 badge-primary btn-border-radius btn-border-radius-sm"
        let fieldStyle = {
            //'whiteSpace': 'nowrap',
            'align-self': 'center',
            'flex-direction': 'row',
            'text-align': 'center',
            'align-content': 'flex-middle',
            'justify-content': 'center',
            'padding': '-30px',
            'width': '300px',
            'position': 'relative',
            'left': '150px',}
        
        return(
              <span>
                <div className={badgeClasses} style={{backgroundColor: "#343644",}}>
                    <strong><label 
                        className="mr-2"
                        style={{fontSize: '16px'}}>
                        Full Name :
                        </label></strong>
                    <EditText 
                        defaultValue={this.props.userName} 
                        placeholder='Username'
                        type='text'
                        style={{padding: '10px', fontSize: '13px'}}
                        onSave={this.props.onNameChange}/>
                    
                    <br/>

                    <strong><label  
                        className="mr-2"
                        style={{fontSize: '16px'}}>
                        Email :
                        </label></strong>
                    <EditText 
                        defaultValue={this.props.email} 
                        type='email'
                        placeholder='Email'
                        style={{padding: '10px', fontSize: '13px'}}
                        onSave={this.props.onEmailChange}/>

                    <br/>

                    <strong><label  
                        className="mr-2"
                        style={{fontSize: '16px'}}>
                        Birthday :
                        </label></strong>
                    <br/>
                    <br/>
                    
                    <span>
                        <Calendar onChange={this.props.birthday.onCalendarChange}
                            defaultValue={new Date(this.props.birthday.year, 
                                this.props.birthday.month, 
                                this.props.birthday.day)}
                            />
                    </span>
                    
                </div>

            </span>
        );
    }
}

export default ProfileDataDisplay;
