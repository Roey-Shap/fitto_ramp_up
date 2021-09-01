import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import InfoScreen from "./src/Screens/InfoScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import ProductScreen from "./src/Screens/ProductScreen";
import ShoppingCartIcon from "./src/Cart/ShoppingCartIcon";
import UserIcon from "./src/User/UserIcon";
import UserScreen from "./src/Screens/UserScreen";

const Stack = createStackNavigator();

const FittoApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          title: "Fitto Intern",
          headerTitleAlign: "center",
          headerRight: () => <ShoppingCartIcon />,
          headerLeft: UserIcon,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Products" component={ProductScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FittoApp;
