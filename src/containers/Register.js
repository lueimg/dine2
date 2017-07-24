import { Alert, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Button, Container, Content, Form, Input, Item, Label, Spinner, Text, Toast } from 'native-base';
import firebase, { loginUser, logoutUser } from '../services/firebase.js'

import React from 'react';

export default class Register extends React.Component {
    static navigationOptions = {
        title: 'Create account',
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errorMessage: ''
        };
        this.registerUser = this.registerUser.bind(this);
    }

    goToLogin = () => {
        this.props.navigation.navigate('Login', {})
    }

    showMessage  = (message) => {
        return Toast.show({
              supportedOrientations: ['portrait','landscape'],
              text: message,
              position: 'top',
              buttonText: 'Okay'
            })
    }

    registerUser() {

        if (!this.state.email || !this.state.password) {
            return this.showMessage("Llene todo el  formulario");
        };

        this.setState({isLoading: true})
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
            this.setState({isLoading: false});
            console.log('created! ', response);
        }, (error) => {
            this.setState({isLoading: false});
            console.log('error ', error);

            this.showMessage(error.message);
        })
        .catch(function (error) {
            console.log('catch ', error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Form >
                        <Item floatingLabel >
                            <Label>Email</Label>
                            <Input style={{padding: 10}} keyboardType='email-address' onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input style={{padding: 10}} onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                        </Item>
                        <Button block style={{ margin: 20 }} onPress={this.registerUser}>
                            <Text>Register</Text>
                        </Button>
                        <Button block transparent dark onPress={this.goToLogin}>
                            <Text >Login</Text>
                        </Button>
                        {this.state.isLoading && <Spinner />}
                    </Form>
                </Content>
            </Container>
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
