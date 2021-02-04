import React, { useState, useContext } from 'react';
import { Container,InputArea,CustomButton,CustoButtomText,SignMessageButton, SignMessageButtonBold,SignMessageButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';
import { UserContext } from '../../contexts/UserContext';

import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';

const SignIn = () => {

  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async() =>{
    
    if (emailField != '' && passwordField != '') {
      let json = await Api.signIn(emailField, passwordField);
      
      if (json.token) {
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar
          }
        });

        navigation.reset({
         routes: [{name: 'MainTab'}] 
        })

      } else {
        alert("Email ou senha incorreto!");
      }
    } else {
      alert("Preencha os campos");
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        
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
          <CustoButtomText>LOGIN</CustoButtomText>
        </CustomButton>

      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick} >
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Cadastre-se</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
}

export default SignIn;