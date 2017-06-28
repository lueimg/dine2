import {StackNavigator} from "react-navigation";
import Login from './Login.js';
import Register from './Register.js';

const StartPageNavigation = StackNavigator({
  Login: {
    screen: Login
  },
  Register: {
    screen: Register
  }
});


export default StartPageNavigation;