import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PHOTO_POST } from '../../Hooks/api';
import useForm from '../../Hooks/useForm';
import Button from '../Button/Button';
import Input from '../Input/Input';
import UserPhotoPostFetch from '../../Hooks/UserPhotoPostFetch';
import Error from '../Helper/Error';
import Head from '../Helper/Head';
import styles from './UserPhotoPost.module.css';

interface Iimg {
  raw: File;
  preview: string;
}

const UserPhotoPost = () => {
  const { value: nameValue, onChange: onChangeName } = useForm(null);
  const { value: pesoValue, onChange: onChangePeso } = useForm('number');
  const { value: idadeValue, onChange: onChangeIdade } = useForm('number');
  const [img, setImg] = useState({} as Iimg);
  const { data, error, loading, request } = UserPhotoPostFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.meta_input) {
      navigate('/conta');
    }
  }, [data, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nameValue);
    formData.append('peso', pesoValue);
    formData.append('idade', idadeValue);

    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token!);
    request(url, options);
  }

  function handleImgChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImg({
      preview: URL.createObjectURL(file),
      raw: file,
    });
  }
  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" onChange={onChangeName} />
        <Input label="Peso" type="number" name="peso" onChange={onChangePeso} />
        <Input
          label="Idade"
          type="number"
          name="idade"
          onChange={onChangeIdade}
        />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
