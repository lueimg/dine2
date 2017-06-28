import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import firebase, { database } from '../services/firebase.js'
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Button, ListItem, Body, Right, List, Header, Left, Title, Icon, Separator, Text
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { map, reduce, orderBy, groupBy } from 'lodash';
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
            this.setState({ user: user }, this.updateList);
        });
    }

    userLoaded(user) {
        this.setState({ user: user });
    }

    updateList() {
        if (!this.state.user) return;

        const ref = 'users/' + this.state.user.uid + '/spends'
        var spendRef = database.ref(ref).orderByChild("date");
        spendRef.on('value', (snapshot) => {
            this.getData(snapshot.val());
        });
    }

    sumTotal (items) {
        return  reduce(items, (sum, item) => { return (sum * 100 + item.amount * 100) / 100; }, 0); // get the total
    }

    getData = (rawData) => {
        let items = map(rawData, (item) => {
            return {
                ...item,
                dateText: moment(item.date).format('dddd, Do'),
                type: 'row' // handle what is a normal row
            }
        }); 
        
        const total = this.sumTotal(items);
        const orderItems = orderBy(items, ['date'], ['desc'])

        const groupList = groupBy(orderItems, 'dateText');
        const groups = Object.keys(groupList);

        let finalList = [];

        for (var index = 0; index < groups.length; index++) {
            let elements = groupList[groups[index]];
            finalList = [
                ...finalList,
                `${groups[index]}:  s/. ${this.sumTotal(elements)}`, 
                ...elements
            ];
        }

        this.setState({ items: finalList, total })
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Lista de Gastos</Title>
                    </Body>
                    <Right />
                </Header>
                
                <Content>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 15 }}>Total gastado: {this.state.total} Soles</Text>
                    </View>
                    <List>
                        {this.state.items.map((item, index) => 
                            <ListRow key={index} item={item} index={index} /> )
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

const ListRow = ({item, index}) => {
    return item.type === 'row' ? <SpendItem item={item} index={index} /> : <SummarySpend item={item} />
}

const SummarySpend = ({item}) => {
    return (
         <Separator bordered>
            <Text>{item}</Text>
          </Separator>
    );
}

const SpendItem = ({item, index}) => {
    return (
        <ListItem key={index}>
            <Body>
                <Text>{item.description}</Text>
                <Text style={{ color: '#ccc', fontSize: 12 }}>{item.dateText}</Text>
            </Body>
            <Right>
                <Text>{item.amount}</Text>
            </Right>
        </ListItem>
    );
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
