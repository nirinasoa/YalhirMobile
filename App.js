/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


//Screens
import { OnBoarding } from './app/screens';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import FicheItem from './app/screens/FicheItem';
import Song from './app/screens/Song';

const Stack = createStackNavigator();
const App = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FicheItem" component={FicheItem} />
        <Stack.Screen name="Song" component={Song} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default () =>{
  return <App/>;
};
