import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Alert} from 'react-native';
import firebase, {loginUser, logoutUser} from '../services/firebase.js'

export default class Profile extends React.Component {

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

    logout = () => {
        this.props.screenProps.logout();
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
                    <TouchableHighlight onPress={this.logout} style={{margin: 15, padding: 20, borderColor: '#000', justifyContent: 'center', backgroundColor: '#000'}}>
                        <Text style={{color: '#fff'}}>Log out</Text>
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
