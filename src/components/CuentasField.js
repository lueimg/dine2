import { Alert, FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
//import liraries
import React, { Component } from 'react';

import { Label } from 'native-base';
import styled from 'styled-components/native';

const ItemWrapper = styled.TouchableHighlight`
    border: 1px;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 5px;
    ${props => props.active ? 'background: #3f51b5;': ''}
    ${props => props.active ? 'color: white;': ''}
`;

const Itemtext = styled.Text`
     ${props => props.active ? 'color: white;': ''}
`;

const CuentaItem  = ({item, selectAccount}) => {
    return (
        <ItemWrapper onPress={() => selectAccount(item)} active={item.selected}>
            <Itemtext active={item.selected}>
                {item.key}
            </Itemtext>
        </ItemWrapper>
    )
}


// create a component
class CuentasField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [
                {key: 'Debito', selected: false, id: 1 }, 
                {key: 'CMR', selected: false, id: 2 }, 
                {key: 'Tarjeta Oh', selected: false, id: 3 }, 
                {key: 'Debito 1', selected: false, id: 4 }, 
                {key: 'Visa GN', selected: false, id: 5 }, 
                {key: 'Cencosub', selected: false, id: 6}
            ]
        }
    }

    selectAccount = (account) => {
        let newData = [...this.state.items];
        newData.some((item) => {
            if (item.key === account.key) {
                item.selected = true;
            } else {
                item.selected = false;
            }
            return false;
            
        })
        this.props.setAccount(account.id);
        this.setState({items: newData});
    }

    render() {
        return (
            <View>
              <Label>Cuentas</Label>
              <FlatList
                  data={this.state.items}
                  renderItem={({item}) => 
                    <CuentaItem 
                        item={item} 
                        selectAccount={this.selectAccount}
                    />
                }
                  horizontal
                />
            </View>
        );
    }
}



//make this component available to the app
export default CuentasField;
