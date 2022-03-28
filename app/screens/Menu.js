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
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import OnBoarding from './OnBoarding/OnBoarding';
import {openDatabase} from 'react-native-sqlite-storage';
import FicheItem from './FicheItem';
import Song from './Song';
import Favoris from './Favoris';
import Info from './Info';
 //Screens

 
 // const Stack = createStackNavigator();
 const db = openDatabase({
  name:'yalhir',
})
  const Drawer = createDrawerNavigator();

 const logout =({navigation}) =>{
  db.transaction(txn => {
    txn.executeSql(
      `
     Update Connexion set isconnected='0' where id=1
      `,[],
      (sqlTxn, res)=>{
        console.log(`table updated successfully`)
      },
      error =>{
        console.log('error on updating table' + error.message)
      }
    )
  })
  navigation.navigate('Login');
  }
 function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
          <Image source={require("../assets/images/piano2.jpg")}
            style = {{ width:260,height:170,marginLeft:5}}
            resizeMode='cover'
        />
         <DrawerItem label="YALHIR"  style={{color:'#f5b207'}}/>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  /*const logout = ({ navigation }) =>{
    AsyncStorage.removeItem('@login')
    navigation.navigate('Login');
    }*/
 const Menu = () =>{
 
   return (
       <Drawer.Navigator
       drawerContent={props => <CustomDrawerContent {...props} />}
       screenOptions={{
        drawerStyle: {
         
        },
      }}
       >
        <Drawer.Screen name="Home" component={Home}  
        options={{
          title: 'Mpamoron-kira', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          }
        }}
        />
        <Drawer.Screen name="Favoris" component={Favoris}  
        options={{
          title: 'Hira tena tiana', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          }
        }}
        />
          <Drawer.Screen name="Info" component={Info}  
        options={{
          title: 'Yaldot-Team', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          }
        }}
        />
       </Drawer.Navigator>
       
      
   )
 }
 
 
 export default () =>{
   return <Menu/>;
 };
 