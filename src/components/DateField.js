//import liraries
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
// create a component
const DateField = ({name, value, onChange, showIcon}) => {
    return (
        <DatePicker
            date={value}
            mode="date"
            placeholder={name}
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={!!showIcon}
            onDateChange={onChange}
        />
    );
};



//make this component available to the app
export default DateField;
