import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/toast';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: []) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail valido'),
          password: Yup.string().min(6, 'No minino 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer seu logon no GoBarber',
        });

        setLoading(false);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setLoading(false);

          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, cheque seus dados',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="goBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="e-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
