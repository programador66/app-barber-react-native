import React from 'react';
import { Container,InputArea,CustomButton,CustoButtomText,SignMessageButton, SignMessageButtonBold,SignMessageButtonText } from './styles';

import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SignInput';

const SignIn = () => {
  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        
        <SignInput IconSvg={EmailIcon} placeholder="Digite seu email"  />
        <SignInput IconSvg={LockIcon}  placeholder="Digite sua senha" />

        <CustomButton>
          <CustoButtomText>LOGIN</CustoButtomText>
        </CustomButton>

      </InputArea>

      <SignMessageButton>
        <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
        <SignMessageButtonBold>Cadastre-se</SignMessageButtonBold>
      </SignMessageButton>
    </Container>
  );
}

export default SignIn;