import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="goBarber" />

      <form>
        <h1>Faça seu Logon</h1>
        <input type="text" placeholder="e-mail" />

        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
        <a href="forgot"> Esqueci minha senha</a>
      </form>
      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;