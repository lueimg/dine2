import {StackNavigator} from "react-navigation";
import Login from './Login.js';
import Register from './Register.js';

import { StatusBar } from 'react-native'

const StartPageNavigation = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});


export default StartPageNavigation;