import React from 'react';
import {TabNavigator} from "react-navigation";
import Login from './src/components/Login.js'
import FormSpent from './src/components/FormSpent.js'
import ListSpend from './src/components/ListSpend.js'


const App = TabNavigator({
  Login: {
    screen : Login
  },
  Form: {
    screen: FormSpent
  },
  List: {
    screen: ListSpend
  }
});

export default App;