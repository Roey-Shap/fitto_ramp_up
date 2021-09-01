import React, { useState, useEffect } from "react";

import {
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Products from "../components/Products";

const ProductScreen = () => {
  let firstLoading = true;
  const backendURL = "https://sheltered-woodland-33515.herokuapp.com/";

  const [product, setProduct] = useState();
  const [amount, setAmount] = useState();
  const [productItems, setProductsItems] = useState([]);

  {
    /* Adding a product function */
  }
  const handleAddProduct = () => {
    Keyboard.dismiss();

    {
      /* Sort the items by id size, and then make the new id larger than all of them */
    }
    let updatedItems = [...productItems].sort((item1, item2) => {
      return item2.id - item1.id;
    });

    const newID = updatedItems.length === 0 ? 0 : updatedItems[0].id + 1;

    let newItem = {
      name: product,
      id: newID,
      qty: amount,
      bought: false,
    };

    updatedItems.unshift(newItem);
    setProductsItems(updatedItems);
    setProduct(null);
    setAmount(0);
  };

  {
    /* Deleting a product function */
  }
  const completeProduct = (index) => {
    let itemsCopy = [...productItems];
    itemsCopy.splice(index, 1);
    setProductsItems(itemsCopy);
  };

  {
    /* Changing is bought option from list function */
  }
  const handleBought = (index) => {
    let updatedItems = [...productItems];
    let specificItem = updatedItems.filter((item) => item.id === index)[0];
    const foundInd = updatedItems.indexOf(specificItem);
    specificItem.bought = !specificItem.bought;
    updatedItems[foundInd] = specificItem;
    setProductsItems(updatedItems);
  };

  // Upon entering this component into the dom, fetch data and update accordingly
  useEffect(() => {
    if (firstLoading === true) {
      fetch(backendURL)
        .then((response) => response.json())
        .then((json) => {
          setProductsItems(json.items);
          firstLoading = false;
        })
        .catch((error) => console.error(error));
    }
  });

  // Calls the backend
  const pushToBackend = () => {
    fetch(backendURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: productItems }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.ProductsWrapper}>
          <Text style={styles.sectionTitle}>Shopping list</Text>
          <View style={styles.items}>
            {/* This is where the Products will go! */}
            {productItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => completeProduct(index)}
                >
                  <Products
                    id={item.id}
                    text={item.name}
                    qty={item.qty}
                    bought={item.bought}
                    onBought={handleBought}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Write a Product */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeProductWrapper}
      >
        <TextInput
          style={styles.inputProduct}
          placeholder={"Write a product"}
          value={product}
          onChangeText={(text) => setProduct(text)}
        />
        <TextInput
          style={styles.inputAmount}
          placeholder={"Amount"}
          keyboardType="numeric"
          value={amount}
          onChangeText={(amount) => setAmount(Number(amount))}
        />
        <TouchableOpacity onPress={() => handleAddProduct()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <SafeAreaView style={{ bottom: 50 }}>
        <Button title="Confirm Changes" onPress={() => pushToBackend()} />
      </SafeAreaView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  ProductsWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeProductWrapper: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  inputProduct: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 220,
  },
  inputAmount: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 100,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
