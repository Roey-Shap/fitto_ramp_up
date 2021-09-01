import React, { Component } from 'react';
import NavBarProfile from '../navbarProfile.jsx';

class ProfilePage extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarProfile backEndURL={this.props.backEndURL} boughtItems={this.props.boughtItems} sendProfileDataToParent={this.props.handleGetProfileData}/>
        <main className="container">
        </main>
      </React.Fragment>
    );
  }
}

export default ProfilePage;
