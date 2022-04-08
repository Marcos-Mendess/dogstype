import useForm from '../../Hooks/useForm';
import { PASSWORD_LOST } from '../../Hooks/api';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import Button from '../Button/Button';
import Input from '../Input/Input';
import useFetch from '../../Hooks/useFetch';

const LoginPasswordLost = () => {
  const {
    onChange: OnChangeLogin,
    value: loginValue,
    error: loginError,
  } = useForm(null);
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!loginError) {
      const { url, options } = PASSWORD_LOST({
        login: loginValue,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      const { json } = await request(url, options);
      console.log(json);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha" />
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Email / Usuário"
            type="text"
            name="login"
            onChange={OnChangeLogin}
          />
          {loading ? (
            <Button>Enviando ...</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
