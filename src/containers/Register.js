import React from 'react';
import { StyleSheet, View, TouchableHighlight, Alert } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner, Toast } from 'native-base';
import firebase, { loginUser, logoutUser } from '../services/firebase.js'

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
        this.gotToLogin = this.gotToLogin.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    gotToLogin = () => {
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
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input keyboardType='email-address' onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                        </Item>
                        <Button block style={{ margin: 20 }} onPress={this.registerUser}>
                            <Text>Register</Text>
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
