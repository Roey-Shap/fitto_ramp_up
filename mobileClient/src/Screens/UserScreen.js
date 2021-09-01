import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

let firstLoading = true;

const UserScreen = () => {
  const backendURL = "https://sheltered-woodland-33515.herokuapp.com";

  // Hooks for name and Email
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(new Date(1598051730000));

  // Hooks for date object
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  //Function that return date as a string to be storeable more easliy
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthday;
    setShow(Platform.OS === "ios");
    setBirthday(new Date(currentDate));
  };

  //Date function for showing the date
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  //Date function for showing the date
  const showDatepicker = () => {
    showMode("date");
  };

  //Upon entering this component into the dom, fetch data and update accordingly
  useEffect(() => {
    if (firstLoading === true) {
      fetch(`${backendURL}/profile/data`)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          setUsername(json.userName);
          let { birthday } = json;
          setBirthday(new Date(birthday.year, birthday.month, birthday.day));
          setAddress(json.address.street);
          setEmail(json.email);
          firstLoading = false;
        })
        .catch((error) => console.error(error));
    }
  });

  //Push to the backend
  const UpdateProfileData = () => {
    let profileData = {
      profilePicture: null,
      userName: username,
      address: {
        street: address,
        streetNumber: null,
        city: null,
        zipCode: null,
        country: null,
      },
      email: email,
      birthday: {
        year: birthday.getDate().toString(),
        month: birthday.getMonth().toString(),
        day: birthday.getYear().toString(),
      },
      defaultDate: "2000-11-14T22:00:00.000Z",
    };

    fetch(`${backendURL}/profile/data`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeProductWrapper}
    >
      <SafeAreaView>
        {/* Button for full name */}
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(val) => setUsername(val)}
          placeholder={username}
        />

        <View style={styles.space} />

        {/* Button for Date name */}
        <Button title="Enter Your Birthday" onPress={showDatepicker} />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}

        <Text
          style={{ textAlign: "center", padding: 20 }}
        >{`${birthday.getDate()} / ${birthday.getMonth()} / ${birthday.getFullYear()}`}</Text>

        <View style={styles.space} />

        {/* Button for email name */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(val) => setEmail(val)}
          keyboardType="email-address"
          placeholder={email}
        />

        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(val) => setAddress(val)}
          placeholder={address}
        />

        <View style={styles.spaceEnding} />

        {/* Add to DB user button */}
        <Button
          title="Update"
          onPress={() => {
            UpdateProfileData();
          }}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  space: {
    width: 20,
    height: 20,
  },
  spaceEnding: {
    width: 20,
    height: 80,
  },
});

export default UserScreen;
