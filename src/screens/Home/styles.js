import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   flex: 1;
   background-color: #63C2D1;
`;

export const Scroller = styled.ScrollView`
   flex: 1;
   padding: 20px;
`;

export const HeaderArea = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

export const HeaderTitle = styled.Text`
   width: 250px
   font-size: 24px;
   font-weight: bold;
   color: #FFF;
`;

export const SearchButton = styled.TouchableOpacity`
   width: 26px;
   height: 26px;
`;

export const LocationArea = styled.View`

`;

export const LocationInput = styled.TextInput`

`;

export const LocationFinder = styled.TouchableOpacity`

`;
