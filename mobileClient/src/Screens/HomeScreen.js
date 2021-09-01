import React from "react";
import { StyleSheet, View, Button, SafeAreaView, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View style={styles.ImageStyle}>
        <Image source={require("../../images/fitto_sticker.png")} />
      </View>

      <View style={styles.ButtonPlacement}>
        <Button onPress={() => navigation.navigate("Info")} title="Info" />
        <Button
          title="Go to products"
          onPress={() => navigation.navigate("Products")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonPlacement: {
    fontSize: 30,
    paddingTop: 200,
  },
  ImageStyle: {
    alignItems: "center",
    paddingTop: 20,
  },
});

export default HomeScreen;
