/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import * as React from 'react';
 import {   createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, } from '@react-navigation/drawer';
import Login from './Login';
import Home from './Home';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,
    Button,
    Alert
    } from 'react-native';
 //Screens

 
 // const Stack = createStackNavigator();
 const Drawer = createDrawerNavigator();
 function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
          <Image source={require("../assets/images/piano2.jpg")}
            style = {{ width: 200, height:200, alignItems:'center', justifyContent:'center', marginLeft:10}}
        />
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
      </DrawerContentScrollView>
    );
  }
 const Menu = () =>{
   return (
       <Drawer.Navigator
       drawerContent={props => <CustomDrawerContent {...props} />}
       screenOptions={{
        drawerStyle: {
         
        },
      }}
       >
         <Drawer.Screen name="Login" component={Login} options={{headerShown: false }} />
         <Drawer.Screen name="Home" component={Home} />
       </Drawer.Navigator>
   )
 }
 
 
 export default () =>{
   return <Menu/>;
 };
 