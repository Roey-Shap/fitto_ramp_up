import React, { Component } from 'react';
import HomePage from './components/homePage.jsx';
import ProfilePage from './components/profilePage.jsx';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const backEndURL = "https://sheltered-woodland-33515.herokuapp.com/";

class App extends Component {
  state = {
    profilePicture: null,
    profileData: null,
    listData: null,
    boughtItems: null
  }

  /*
  handleGetProfilePicture(picture) {
    this.setState({ profilePicture: picture })
  }
  */

  handleGetListData(listData) {
    // here we can update based on what we fetched down below
    this.setState( {listData: listData });
    
    // process which of the items are of full quantity
    let boughtItems = [];
    for (let item in listData.items) {
      if (item.qty === item.qtyMax) boughtItems.push(item);
    }
    this.setState({ boughtItems: boughtItems });
  }

  handleGetProfileData(profileData) {
    // here we can give the necessary data so that 
    // handleGetListData can use it without fetching the profile data again
    this.setState({ profileData: profileData });
  }

  // ^^^ if needed for comparison without refetching, both profile and list data are here now ^^^

  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/profile" render={ () => <ProfilePage backEndURL={backEndURL} boughtItems={this.state.boughtItems} getProfileData={this.handleGetProfileData}/> }/>
            <Route exact path="/" render={ () => <HomePage backEndURL={backEndURL} getListData={this.handleGetListData} handleGetProfilePicture={this.handleGetProfilePicture}/> }/>      
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
