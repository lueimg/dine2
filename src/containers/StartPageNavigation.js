import Login from './Login.js';
import Register from './Register.js';
import {StackNavigator} from "react-navigation";
import { StatusBar } from 'react-native'

const StackNavigatorConfig = {
  initialRouteName: 'Login',
  // headerMode: 'none', //  float , screen,
  // navigationOptions
}


const StartPageNavigation = StackNavigator({
  Login: {
    screen: Login,
    // navigationOptions: ({navigation}) => ({
    //   title: `${navigation.state.params.name}'s Profile'`,
    // }),
  },
  Register: {
    screen: Register
  }
}, StackNavigatorConfig) ;


export default StartPageNavigation;