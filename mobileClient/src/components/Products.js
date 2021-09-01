import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.icon}>
            <Icon name="food-variant" size={30} />
          </View>
          <Text style={styles.itemText}>
            {this.props.text} - {this.props.qty}
          </Text>
        </View>
        <View style={styles.circular}>
          <Button
            onPress={() => this.props.onBought(this.props.id)}
            title={this.props.bought.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  icon: {
    width: 30,
    height: 30,
  },
  itemText: {
    paddingLeft: 20,
    maxWidth: "80%",
  },
  circular: {
    width: 80,
    height: 35,
  },
});

export default Products;
