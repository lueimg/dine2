import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import firebase, {database} from '../services/firebase.js'
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button, ListItem, Body, Right, List, Header, Left, Title, Icon
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {map, reduce, orderBy} from 'lodash';
export default class ListSpend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            date: moment().format("YYYY-MM-DD"),
            items: [],
            total: 0
        };
    }

    componentDidMount() {
        // Listen for authentication state to change.
        firebase.auth().onAuthStateChanged(user => { 
            this.setState({user: user}, this.updateList); 
        });
    }

    userLoaded(user) {
        this.setState({user: user});
    }

    updateList() {
        if (!this.state.user) return ;

        const ref = 'users/' + this.state.user.uid + '/spends'
        var spendRef = database.ref(ref).orderByChild("date");
        spendRef.on('value', (snapshot) => {
         this.getData(snapshot.val());
        });
    }

    getData = (rawData) => {
        const items = map(rawData, (item) => {
            return {
                ...item,
                dateText: moment(item.date).format("YYYY-MM-DD")
            }
        }); // return an array
        const total = reduce(items, (sum, item) => sum + +item.amount, 0); // get the total
        const orderItems = orderBy(items, ['date'], ['desc'])
        this.setState({items: orderItems, total})
    }

    render() {
        
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <Title>Lista de Gastos</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{margin: 20}}>
                    <Text style={{fontSize: 15}}>Total gastado: {this.state.total} Soles</Text>
                </View>
                <Content>
                   <List>
                    {this.state.items.map( (item, index) => (
                        <ListItem key={index}>
                               <Body>
                                    <Text>{item.description}</Text>
                                    <Text style={{color: '#ccc', fontSize: 12}}>{item.dateText}</Text>
                                </Body>
                                <Right>
                                    <Text>{item.amount}</Text>
                                </Right>
                            </ListItem>
                    ))}
                    </List>
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
