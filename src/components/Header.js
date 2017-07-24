import { StatusBar, Text, View } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

const HeaderStatusBar = styled.View`
  height: 25px;
  background: blue;
`;

const HeaderWrapper = styled.View`
  height: 70px;
  border-bottom-width: 1px;
  background: #3f51b5;
  justify-content: center;
  align-items: center
`;
const TextWrapper = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`;

const Header = ({title}) => {
  return (
    <HeaderWrapper>
      <HeaderStatusBar />
      <TextWrapper>
        {title}
      </TextWrapper>
    </HeaderWrapper>
  )
}

export const HOCHeader = (title) => {
    return <Header title={title} />
}

export default Header;