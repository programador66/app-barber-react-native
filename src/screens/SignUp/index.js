import React, { useState, useContext } from 'react';
import { Container,InputArea,CustomButton,CustoButtomText,SignMessageButton, SignMessageButtonBold,SignMessageButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import PersonIcon from '../../assets/person.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';

import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

const SignIn = () => {

  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [nomeField, setNomeField] = useState('');
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () =>{
    if (nomeField != '' && emailField != '' && passwordField != '') {
      let res = await Api.signUp(nomeField, emailField, passwordField);

      if (res.token) {
        await AsyncStorage.setItem('token', res.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: res.data.avatar
          }
        });

        navigation.reset({
         routes: [{name: 'MainTab'}] 
        })

      } else {
        alert("Error: "+ res.error);
      }

    } else {
      alert('Preencha os campos!');
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignIn'}],
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>

      <SignInput 
        IconSvg={PersonIcon} 
        placeholder="Digite seu nome"
        value={nomeField}
        onChangeText={t=> setNomeField(t)}  
      />

      <SignInput 
        IconSvg={EmailIcon} 
        placeholder="Digite seu email"
        value={emailField}
        onChangeText={t=> setEmailField(t)}  
      />
      <SignInput 
        IconSvg={LockIcon}
        placeholder="Digite sua senha"
        value={passwordField}
        onChangeText={t=> setPasswordField(t)}
        password={true}
      />

      <CustomButton onPress={handleSignClick}>
        <CustoButtomText>CADASTRAR</CustoButtomText>
      </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick} >
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Faça Login</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
}

export default SignIn;