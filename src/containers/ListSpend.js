import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import firebase, { database } from '../services/firebase.js'
import { Container, Content, Form, Item, Input, Label, Button, ListItem, Body, Right, List, Header, Left, Title, Icon, Separator, Text, Spinner } from 'native-base';
import DateField from '../components/DateField.js';
import { today, startDateDisplay, endDateDisplay, getDateDisplay, getDateUnix } from '../services/Dates.js';
import { map, reduce, orderBy, groupBy } from 'lodash';
import FirebaseReady from '../components/FirebaseReady.js';
import styled from 'styled-components/native';

class ListSpend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: today,
            items: [],
            total: 0,
            startDate: startDateDisplay,
            endDate: endDateDisplay,
            isLoading: true
        };
    }

    componentDidMount() {
        this.databaseRef = 'users/' + this.props.user.uid + '/spends';
        this.updateList();
    }

    startLoading = () => {
        this.setState({ isLoading: true })
    }
    stopLoading = () => {
        this.setState({ isLoading: false })
    }

    updateList = () => {
        
        const spendRef = database.ref(this.databaseRef)
            .orderByChild("date")
            .startAt(getDateUnix(this.state.startDate))
            .endAt(getDateUnix(this.state.endDate));
            
        this.startLoading();

        spendRef.on('value', (snapshot) => {
            this.getData(snapshot.val());
        });
    }

    sumTotal(items) {
        return reduce(items, (sum, item) => { return (sum * 100 + item.amount * 100) / 100; }, 0); // get the total
    }

    getData = (rawData) => {
        let items = map(rawData, (item) => {
            return {
                ...item,
                dateText: getDateDisplay(item.date),
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

        this.setState({ items: finalList, total }, () => {
            this.stopLoading();
        })
    }

    onChangeStartDate = (date) => {
        this.setState({ startDate: date }, () => {
            this.updateList();
        });

    }

    onChangeEndDate = (date) => {
        this.setState({ endDate: date }, () => {
            this.updateList();
        });
    }

    render() {

        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Gastos</Title>

                    </Body>
                    <Right />
                </Header>

                <Content>
                    {this.state.isLoading && <Spinner />}
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 15 }}>Total gastado: {this.state.total} Soles</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                        <Text style={{ flex: 1 }}>Filtros:</Text>
                        <DateField
                            name="Start date"
                            value={this.state.startDate}
                            onChange={this.onChangeStartDate}
                        />

                        <DateField
                            name="End date"
                            value={this.state.endDate}
                            onChange={this.onChangeEndDate}
                        />
                    </View>
                    <List>
                        {this.state.items.map((item, index) =>
                            <ListRow key={index} item={item} index={index} />)
                        }
                    </List>
                </Content>
            </Container>

        );
    }
}


const ListRow = ({ item, index }) => {
    return item.type === 'row' ? <SpendItem item={item} index={index} /> : <SummarySpend item={item} />
}

const SummarySpend = ({ item }) => {
    return (
        <Separator bordered>
            <Text>{item}</Text>
        </Separator>
    );
}

const SmallText = styled.Text`
    color: #cccccc;
    font-size: 12px;
`;

const SpendItem = ({ item, index }) => {
    return (
        <ListItem key={index}>
            <Body>
                <Text>{item.description}</Text>
                <SmallText>{item.dateText} - {item.date} - {item.createAt}</SmallText>
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
        justifyContent: 'center',

    },
    button: {
        marginTop: 20
    }
});

export default FirebaseReady(ListSpend);