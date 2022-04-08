import React from 'react';
import { useState, useEffect } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../Hooks/api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router';
import Head from '../Helper/Head';
import useForm from '../../Hooks/useForm';

function LoginPasswordReset() {
  const [key, setKey] = useState('');
  const [login, setLogin] = useState('');
  const {
    onChange: OnChangePassword,
    value: passwordValue,
    error: passwordError,
  } = useForm(null);
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(key!);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!passwordError) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: passwordValue,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          onChange={OnChangePassword}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
}

export default LoginPasswordReset;
