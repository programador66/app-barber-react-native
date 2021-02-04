import React from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, LocationFinder } from './styles';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

const Home = () => {

  const navigation = useNavigation();
  return (
    <Container>
      <Scroller>

        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro</HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" height="26" fill="#FFFFFF" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput />
          <LocationFinder>
            <MyLocationIcon width="24" height="26" fill="#FFFFFF" />
          </LocationFinder>   
        </LocationArea>

      </Scroller>
    </Container>
  );
}

export default Home;