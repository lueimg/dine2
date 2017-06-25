import React from 'react';
import {TabNavigator} from "react-navigation";
import Login from './src/containers/Login.js'
import FormSpent from './src/containers/FormSpent.js'
import ListSpend from './src/containers/ListSpend.js'
import Expo from "expo";

const loadFiles = async () => {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
    }

loadFiles();

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