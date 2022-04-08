import { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import styles from './LoginForm.module.css';
import Head from '../Helper/Head';

const LoginForm = () => {
  const {
    onChange: OnChangeUsername,
    value: usernameValue,
    error: usernameError,
  } = useForm(null);
  const {
    onChange: OnChangePassword,
    value: passwordValue,
    error: passwordError,
  } = useForm(null);

  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!usernameError && !passwordError) {
      userLogin(usernameValue, passwordValue);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          type="text"
          name="username"
          autoComplete="on"
          onChange={OnChangeUsername}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          autoComplete="on"
          onChange={OnChangePassword}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos'} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={styles.button} to="/login/create">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
