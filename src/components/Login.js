import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import Exponent from "expo";
import firebase, {loginUser, logoutUser} from '../services/firebase.js'

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            user: {}
        };
    }
    componentDidMount() {
        // Listen for authentication state to change.
        firebase
            .auth()
            .onAuthStateChanged(user => {
                this.setState({user: user});
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.user && <TouchableHighlight onPress={loginUser}>
                    <Text>LOG IN</Text>
                </TouchableHighlight>}
                {this.state.user && <View>
                    <Text>
                        {this.state.user.email}
                    </Text>
                    <TouchableHighlight onPress={logoutUser}>
                        <Text>Log out</Text>
                    </TouchableHighlight>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
