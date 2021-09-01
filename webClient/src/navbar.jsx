import React, { Component } from "react";
import List from './components/list.jsx';
import defaultProfilePicture from './extraImages/defaultPic.ico';
import RedirectButton from './components/redirectButton.jsx';
import { BrowserRouter } from 'react-router-dom';

class NavBar extends Component {
    state = {
        profilePicture: defaultProfilePicture,
    }
    async getProfilePicture() {
        try {
            let response = await fetch(this.props.backEndURL || "http://localhost:3002/profile");
//            let responseJSON = await response.json();
            
            console.log(response.json());
            //this.setState({ profilePicture: responseJSON });
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getProfilePicture();
    }
    
    render() {
        return (
            <BrowserRouter>
            <span>
                <nav className="navbar navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <div className="up-right">
                            <h1 style={{ position: 'relative', left: 25 }}> Shopping List </h1>
                        </div>
                    </a>
                    <RedirectButton text="Profile" destination='/profile' backEndURL={this.props.backEndURL} />
                </nav>
                <div> 
                    <List backEndURL={this.props.backEndURL} sendListDataUpToParent={this.props.getListData} canEdit={true}/>
                </div>
            </span> 
            </BrowserRouter>
        );
    }
}

export default NavBar;