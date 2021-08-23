import React, { Component } from 'react';
import NavBar from '../navbar.jsx';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar backEndURL={this.props.backEndURL} getListData={this.props.getListData} onProfilePictureGet={this.props.handleGetProfilePicture}/>
        <main className="container">
        </main>
      </React.Fragment>
    );
  }
}

export default HomePage;
