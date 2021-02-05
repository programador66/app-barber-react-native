import React, { useState, useEffect } from 'react';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, LocationFinder, LoadingIcon, ListArea } from './styles';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

import Geolocation from '@react-native-community/geolocation';
import Api from '../../Api';
import BarberItem from '../../components/BarberItem';


const Home = () => {

  const navigation = useNavigation();
  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const handleLoactionFinder = async () => {
    setCoords(null);

    let result = await request(
      Platform.OS === 'ios' ?
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        :
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (result == 'granted') {

      setLoading(true);
      setLocationText('');
      setList([]);

      Geolocation.getCurrentPosition((info) => {
        setCoords(info.coords);
        getBarbers();
      })
    }

  }

  const getBarbers = async () => {
    setLoading(true);
    setList([]);

    let res = await Api.getBarbers();
      console.log(res);
    if (res.error != '')
      alert('Error: '+ res.error);

    if (res.loc)
      setLocationText(res.loc);

    setList(res.data);
    setLoading(false);

  }

  useEffect(() => {
    getBarbers();
  },[])

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
          <LocationInput 
            placeholder="Onde você está?" 
            placeholderTextColor="#FFFFFF" 
            value={locationText}
            onChangeText={t => setLocationText(t)}
          />
          <LocationFinder onPress={handleLoactionFinder} >
            <MyLocationIcon width="24" height="26" fill="#FFFFFF" />
          </LocationFinder>   
        </LocationArea>

        {loading &&
          <LoadingIcon size="large" color="#FFFFFF" />
        }
        
        <ListArea>
          {
            list.map((item,k) => (
              <BarberItem  key={k} data={item} />
            ))
          }
        </ListArea>

      </Scroller>
    </Container>
  );
}

export default Home;