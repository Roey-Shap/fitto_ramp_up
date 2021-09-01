import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const ShoppingCartIcon = (props) => {
  const navigation = useNavigation();
  const [productItems, setProductsItems] = useState([]);

  const backendURL = "https://sheltered-woodland-33515.herokuapp.com/";

  useEffect(() => {
    fetch(backendURL)
      .then((response) => response.json())
      .then((json) => {
        setProductsItems(json.items);
        firstLoading = false;
      })
      .catch((error) => console.error(error));
  });

  return (
    <View style={{ padding: 7 }}>
      <View style={styles.iconDesign}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          {productItems.length}
        </Text>
      </View>
      <Icon
        onPress={() => navigation.navigate("Products")}
        name="ios-cart"
        size={30}
      />
    </View>
  );
};

export default ShoppingCartIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconDesign: {
    position: "absolute",
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: "#13a1ff",
    right: 37,
    bottom: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
});
