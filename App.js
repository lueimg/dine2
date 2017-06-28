import React from 'react';
import StartPageNavigation from './src/containers/StartPageNavigation.js'
import SpendNavigation from './src/containers/SpendNavigation.js';

import { Spinner } from 'native-base';

import Expo from "expo";
import firebase, { logoutUser } from './src/services/firebase.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.defaultValues = {
      user: {},
      isLoading: true,
      fontLoading: true,
    }

    this.state = {
      ...this.defaultValues
    };
    this.logout = this.logout.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({fontLoading: false})
  }

  componentDidMount() {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoading: false, user })
    });
  }

  logout() {
    logoutUser();
    this.setState({ user: {} });
  }


  render() {
    if (this.state.fontLoading || this.state.isLoading) return <Expo.AppLoading />;
    if (!this.state.user) return <StartPageNavigation />

    return <SpendNavigation screenProps={{ logout: this.logout }} />

  }

}


export default App;