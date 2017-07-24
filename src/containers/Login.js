import { Alert, StyleSheet, TouchableHighlight, View } from 'react-native';
import { Button, Container, Content, Form, Input, Item, Label, Spinner, Text, Toast } from 'native-base';
import firebase, { loginUser, logoutUser } from '../services/firebase.js'

import React from 'react';

export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Log In',
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errorMessage: ''
        };
        this.LoginUser = this.LoginUser.bind(this);
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register', {})
    }

    showMessage  = (message) => {
        return Toast.show({
              supportedOrientations: ['portrait','landscape'],
              text: message,
              position: 'top',
              buttonText: 'Okay'
            })
    }

    LoginUser() {

        if (!this.state.email || !this.state.password) {
            return this.showMessage("Llene todo el formulario");
        };

        this.setState({isLoading: true})

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
            this.setState({isLoading: false});
        }, (error) => {
            this.setState({isLoading: false});
            this.showMessage(error.message);
        });
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1 }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input style={{padding: 10}} keyboardType='email-address' onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input  style={{padding: 10}}  onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                        </Item>
                        <Button block style={{ margin: 20 }} onPress={this.LoginUser}>
                            <Text>Login</Text>
                        </Button>
                        <Button block transparent dark onPress={this.goToRegister}>
                            <Text >Register</Text>
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
