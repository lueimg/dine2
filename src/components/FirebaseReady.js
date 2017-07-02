import React, {Component, createElement} from 'react';
import firebase from '../services/firebase.js'
import {Text} from 'native-base';

export default function WrapperFirebase (Component) {
    return class extends Component {

        constructor(props) {
            super(props);

            this.state = {
                user : undefined,
            }
        }


        componentDidMount() {
            // Listen for authentication state to change.
            firebase.auth().onAuthStateChanged(user => {
                this.setState({ user: user });
            });
        }

        render() {
            if (this.state.user) return <Component {...this.props} user={this.state.user} />

            return  <Text>Loading user ... </Text> 
            
        }
    }
}