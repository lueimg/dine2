import Header, {HOCHeader} from '../components/Header.js';
import { StatusBar, View } from 'react-native';

import Login from './Login.js';
import React from 'react';
import Register from './Register.js';
import {StackNavigator} from "react-navigation";

const routeConfig = {
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      title: 'Login',
      header: HOCHeader("Login")
    }),
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      title: 'Register',
      header: HOCHeader("Register")
    }),
  }
}


const StackNavigatorConfig = {
  initialRouteName: 'Login',
  // headerMode: 'none', //  float , screen,
  //  navigationOptions: {
  //    header: HOCHeader("")
  //  }
}


const StartPageNavigation = StackNavigator(routeConfig, StackNavigatorConfig) ;


export default StartPageNavigation;