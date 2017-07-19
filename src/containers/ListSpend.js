import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Label, Left, List, ListItem, Right, Separator, Spinner, Text, Title } from 'native-base';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { endDateDisplay, getDateDisplay, getDateUnix, startDateDisplay, today } from '../services/Dates.js';
import firebase, { database } from '../services/firebase.js'
import { groupBy, map, orderBy, reduce } from 'lodash';

import DateField from '../components/DateField.js';
import FirebaseReady from '../components/FirebaseReady.js';
import React from 'react';
import styled from 'styled-components/native';

const AcountsWrap = styled.View`
    flex-direction: row;
    justify-content: center
`;

const AccountFilter = styled(TouchableHighlight)`
    background: ${ props => props.active ? 'blue': '#cccccc'};
    padding: 5px;
    margin : 5px;

`;



class ListSpend extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            date: today,
            items: [],
            total: 0,
            startDate: startDateDisplay,
            endDate: endDateDisplay,
            isLoading: true,
            filterType: 'debito'
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
        const filterTypeCondition = this.state.filterType === 'debito' ? 
            item =>  item.account == 1 || !item.account :
            item => item.account > 1

        let items = map(rawData, (item) => {
            return {
                ...item,
                dateText: getDateDisplay(item.date),
                type: 'row' // handle what is a normal row
            }
        }).filter(filterTypeCondition)

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


    filterByAccount = (type) => {
        this.setState({filterType: type}, () => {
            this.updateList();
        })
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
                    <AcountsWrap>
                        <AccountFilter active={this.state.filterType == 'debito'} onPress={ () => this.filterByAccount('debito')}>
                            <Text>Debito</Text>
                        </AccountFilter>
                        <AccountFilter active={this.state.filterType != 'debito'} onPress={ () => this.filterByAccount('credito')}>
                            <Text>Credito</Text>
                        </AccountFilter>
                    </AcountsWrap>
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
    return item.type === 'row' ? 
        <SpendItem item={item} index={index} /> : 
        <SummarySpend item={item} />
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
                <SmallText>{item.dateText}</SmallText>
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