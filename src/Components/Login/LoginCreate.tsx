import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { USER_POST } from '../../Hooks/api';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Button from '../Button/Button';
import Input from '../Input/Input';
import useFetch from '../../Hooks/useFetch';

const LoginCreate = () => {
  const username = useForm(null);
  const email = useForm('email');
  const password = useForm(null);
  const navigate = useNavigate();

  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
      navigate('/login');
    }
  }
  return (
    <section className="animeLeft">
      <Head title="Crie sua conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" autoComplete="on" />
        <Input label="Email" type="email" name="email" autoComplete="on" />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="on"
        />

        {loading ? (
          <Button disabled> Cadastrando...</Button>
        ) : (
          <Button> Criar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
