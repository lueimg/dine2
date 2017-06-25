import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import firebase, {database} from '../services/firebase.js'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label, Button, Header, Left, Right, Body, Title
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
export default class FormSpent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      date: moment().format("YYYY-MM-DD"),
      amount: "",
      description: ""
    };
    this.saveSpend = this.saveSpend.bind(this);
    this.cleanForm = this.cleanForm.bind(this);
  }

  componentDidMount() {
    // Listen for authentication state to change.
    firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ user: user });
        //console.log("uesr", user)
      });
  }

  saveSpend () {
      const ref = 'users/' + this.state.user.uid + '/spends'
      var newSpend = database.ref(ref).push();
      newSpend.set({
        date: moment(this.state.date).valueOf(),
        amount: this.state.amount,
        description: this.state.description
      })
      this.cleanForm();
  }

  cleanForm () {
    this.setState({
      date: moment().format("YYYY-MM-DD"),
      amount: "",
      description: ''
    })
  }


  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Registro</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form style={{ marginTop: 50 }}>
            <View style={{ margin: 15 }}>

              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => { this.setState({ date: date }) }}
              />
            </View>
            <Item stackedLabel>
              <Label>Gasto</Label>
              <Input keyboardType='numeric' onChangeText={(amount) => this.setState({amount})} value={this.state.amount} />
            </Item>
            <Item stackedLabel>
              <Label>Descripcion</Label>
              <Input onChangeText={(description) => this.setState({description})} value={this.state.description}/>
            </Item>
            <View style={{ margin: 10 }}>
              <Button block primary onPress={this.saveSpend}>
                <Text style={{ color: '#fff' }}>Guardar</Text>
              </Button>
              <Button light block style={{ marginTop: 30 }} onPress={this.cleanForm}>
                <Text>Cancelar</Text>
              </Button>
            </View>
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
  },
  button: {
    marginTop: 20
  }
});
