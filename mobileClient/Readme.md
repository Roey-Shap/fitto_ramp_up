### Created by @RoyMishael


Installation instructions:
1. Expo install

2. Navigation:
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context

3. Icons
npm install react-native-vector-icons

4. Date
npm install @react-native-community/datetimepicker --save


App explanation:

The app is based on 4 screens and a navigation bar:
* Homescreen - shows you: Info screen, Products list screen (which also can be accessed by cart icon in the navigation bar) , user screen (which also can be accessed by user icon in the navigation bar)

* Carts/Product screen - a list that is fetched by Heroku app server that is also connected to Roey site. The amount of products is also being shown in the cart icon navigation bar through all screens.

* Info Screen - Simple text info screen

* User Screen - A user screen fetched by Roey Heroku app server and also connected to the site (can be navigated from the navigation bar) 

* The navigation bar is using  Stack Navigator

