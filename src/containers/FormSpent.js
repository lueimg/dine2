import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import firebase, { database } from '../services/firebase.js'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label, Button, Header, Left, Right, Body, Title, Segment, Toast, Spinner
} from 'native-base';
import DateField from '../components/DateField.js';
import { today, now, getDateUnix } from '../services/Dates.js';
import FirebaseReady from '../components/FirebaseReady.js';

class FormSpent extends React.Component {

  constructor(props) {
    super(props);

    this.defaultValues = {
      date: today,
      amount: "",
      description: "",
      account: 1,
      isLoading: false
    }

    this.state = {
      ...this.defaultValues
    };

    this.saveSpend = this.saveSpend.bind(this);
    this.cleanForm = this.cleanForm.bind(this);

    this.accounts = [
      { id: 1, 'name': 'Debito' },
      { id: 2, 'name': 'CMR' },
      { id: 3, 'name': 'TarjetaOh' },
      { id: 4, 'name': 'Diners' },
    ]
  }
  startLoading = () => {
    this.setState({ isLoading: true })
  }
  stopLoading = () => {
    this.setState({ isLoading: false })
  }

  saveSpend() {
    if (!this.state.amount || !this.state.description) {
      this.showMessage("Ingrese monto y descrip")
      return false;
    }
    const ref = 'users/' + this.props.user.uid + '/spends';

    var newSpend = database.ref(ref).push();
    this.startLoading();
    newSpend.set({
      date: getDateUnix(this.state.date),
      amount: this.state.amount,
      description: this.state.description,
      account: this.state.account,
      createAt: now()
    }).then((response) => {
      this.cleanForm();
      this.stopLoading()
    }, (error) => {
      this.showMessage(error.message)
      this.stopLoading()
    })

  }

  cleanForm() {
    this.setState({
      ...this.defaultValues
    })
  }

  setAccount = (id) => {
    this.setState({ account: id })
  }

  showMessage = (message) => {
    return Toast.show({
      supportedOrientations: ['portrait', 'landscape'],
      text: message,
      position: 'top',
      buttonText: 'Okay'
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
          {this.state.isLoading && <Spinner />}
          <Form style={{ marginTop: 50 }}>
            <View style={{ margin: 15 }}>
              <DateField
                name="select date"
                value={this.state.date}
                onChange={(date) => { this.setState({ date: date }) }}
                showIcon
              />
            </View>
            <Item stackedLabel>
              <Label>Gasto</Label>
              <Input keyboardType='numeric' onChangeText={(amount) => this.setState({ amount })} value={this.state.amount} />
            </Item>
            <Item stackedLabel>
              <Label>Descripcion</Label>
              <Input onChangeText={(description) => this.setState({ description })} value={this.state.description} />
            </Item>
            <View>
              <Label>Cuentas</Label>
              <Segment style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {this.accounts.map((item) => (
                  <AccountButton
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    isActive={this.state.account == item.id}
                    cb={this.setAccount}
                  />
                ))}
              </Segment>
            </View>
            <View style={{ margin: 10 }}>
              <Button block primary onPress={this.saveSpend}>
                <Text style={{ color: '#fff' }}>Guardar</Text>
              </Button>
              <Button light block style={{ marginTop: 30 }} onPress={this.cleanForm}>
                <Text>Cancelar </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const AccountButton = ({ id, name, isActive, cb }) => {

  const onPress = () => {
    cb(id)
  }

  return (
    <Button active={isActive} onPress={onPress}>
      <Text>{name}</Text>
    </Button>
  )
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


export default FirebaseReady(FormSpent);