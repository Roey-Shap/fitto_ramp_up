import React, { Component } from "react";
import RedirectButton from './components/redirectButton.jsx';
import 'react-edit-text/dist/index.css';
import 'react-calendar/dist/Calendar.css';
import List from './components/list.jsx';
import ProfileDataDisplay from './components/profileDataDisplay.jsx';

const cloudURL = "https://api.cloudinary.com/v1_1/roeyshap/image/upload";
//"http://localhost:3002/profile"

let initState = {
    profilePicture: null,
    userName: "You shouldn't be seeing this default name",
    address: {
        street: "Default Street",
        streetNumber: 0,
        city: "Default City",
        zipCode: '00000',
        country: "Default Country"
    },
    email: "default@test.none",
    birthday: {
        year: 2000,
        month: 10,
        day: 5
    },
}

class NavBarProfile extends Component {
    state = {
        userData: initState,
        hasProfilePicture: false
    }

    handlePictureSelect = (data) => {
        this.setState({ profilePicture: data.target.files[0] });
        this.setState({ hasProfilePicture: true });
    }

    handleUploadPicture = async () => {

        alert("Error 1n4ern: This feature is currently unavailable, see code comments.")
        return;
        // faced issues with multiple approaches:
        // 1) sending raw data as with list and profile data
        // 2) via cloudinary almost worked, but there were issues with the key to upload to them;
        // had that little detail been worked out, we could have accessed the profile picture via URL

        console.log(this.state.profilePicture);
        const formData = new FormData();
        formData.append("file", this.state.profilePicture);
        formData.append('upload_preset', "default2");
        
        //console.log(this.state.profilePicture);
        //const data = fetch("http://localhost:3002/profile", {
        const data = await fetch(cloudURL, {
            method: 'POST',
                //headers: { "Content-Type": "multipart/form-data" },
            parameters: {
                upload_preset: "default2"
            },
            body: formData
            })
            .then( (response) => { 
                console.log(response); 
                // response should be the new filename
                //this.setState({ profilePictureName: response })
                //return (<Redirect  to="/profile" />);
            })
            .catch( (error) => { console.error(error) });      
    };


    // Here is the scarred attempt at retrieving the profile piture using the raw data method
    /*async getProfilePicture() {
        try {
           let response = await fetch(/*this.props.backEndURL ||  "http://localhost:3002/profile");
            let responseJSON = await response.json();

            console.log(response);
            console.log("And now the JSON'd:");
            console.log(responseJSON);
            this.setState({ profilePicture: responseJSON });
        } catch (error) {
            console.error(error);
        }
    }*/

    // Fetch profile data                               
    async getProfileData() {
      try {
        const response = await fetch(`${this.props.backEndURL}/profile/data` ||  "http://localhost:3002/profile/data");
        const responseJSON = await response.json();                    
        const { birthday } = responseJSON;
        const date = new Date(birthday.year, birthday.month, birthday.day);
        
        // TODO: Get profile data updating based on fetched Backend data correctly 
        // Similar to line 77 in list.jsx, it seems there's a DOM-update issue where React sees only
        // partial data updates and thus doesn't change everything, possibly.
        // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
        // https://reactjs.org/docs/state-and-lifecycle.html

        // Here I tryed to set everything into userData to make it look "completely different"
        // from the previous data to force a mass-update when the single userData is sent back, to no avail
        let fetchedData = { 
            userName: responseJSON.userName, 
            address: responseJSON.address,
            email: responseJSON.email,
            birthday: responseJSON.birthday,
            defaultDate: date,
            };

        console.log(responseJSON);

        await this.setState({ userData: fetchedData });

        console.log("and now the state:");
        console.log(this.state);
      } catch (error) {
        console.error(error);
      }
    }

    componentDidMount() {
        //this.getProfilePicture();
        this.getProfileData();
    }

     handleNameChange = (data) => {
        let updatedData = this.state.userData;
        updatedData.name = data.value;
        this.setState({ userData: updatedData })
    }

    handleEmailChange = (data) => {
        let updatedData = this.state.userData;
        updatedData.email = data.value;
        this.setState({ userData: updatedData });
    }

    handleCalendarChange = (value, event) => {
        const date = new Date(value);
        const parsedDate = {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()};
        console.log(parsedDate);

        let updatedData = this.state.userData;
        updatedData.email = parsedDate;
        this.setState({ userData: updatedData });
    }
    

    handleUpdateProfileData = () => {
        let sendData = this.state.userData;
      console.log(JSON.stringify(this.state));
        fetch(`${this.props.backEndURL}/profile/data` || "http://localhost:3002/profile/data", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData: sendData })
      })
      .then( (response) => { console.log(response) })
      .catch( (error) => { console.error(error) }) 

      // as in list.jsx, we're forgetting about this for now... unnecessary
      //this.props.sendProfileDataToParent(this.state);
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

        return (
            <span>
                <nav className="navbar navbar-dark bg-dark">
                    <div>
                        <a className="navbar-brand" href="/profile">
                            <div>
                                <h1 style={{ position: 'relative', top: 20, left: 20}}> Profile </h1>
                            </div>
                        </a>
                        <div className={{'color':'white'}}>
                            <button 
                                className="btn btn-outline-primary m-1" 
                                onClick={() => this.handleUpdateProfileData()}
                                style={{'margin': 'center',
                                        'width': '100%',
                                        'border': '2px solid white',
                                        'padding': '-10px'}}>
                            Confirm Changes
                            </button>
                        </div>
                    </div>
                    <RedirectButton text="Shopping Cart" destination='/' backEndURL={this.props.backEndURL}/>
                </nav>
                
                <br/>
                
                <div className="tight-row">
                    <ProfileDataDisplay userName={this.state.userData.userName}
                                        email={this.state.userData.email}
                                        birthday={this.state.userData.birthday}/>
                    <span>

                        <div className={badgeClasses} 
                            style={{
                                padding: '10px', 
                                fontSize: '16px', 
                                backgroundColor: "#343644",
                                height: 45}}>

                            <form action={cloudURL} encType="multipart/form-data" method="post">
                                <label htmlFor="file"> <h6> Change Profile Picture  : </h6> </label> 
                                <input type="file" id="file" name="file" onChange={(event) => this.handlePictureSelect(event)}/>
                                <button disabled={!this.state.hasProfilePicture} onClick={this.handleUploadPicture}> 
                                    {this.state.hasProfilePicture ? "Upload Profile Picture" : "Please select a picture" } </button>
                            </form>
                        </div>

                        <div style={fieldStyle}>
                            <div style={{'position': 'relative', 'left': '20px'}}>
                                - Previously Bought Items -
                            </div>
                            <List canEdit={false}/>
                        </div>

                    </span>
                </div>
            </span>
        );
    }
}

export default NavBarProfile;