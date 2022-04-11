import React from 'react';
import { useState } from 'react';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import { COMMENT_POST } from '../../Hooks/api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';
import { Comment } from '../../Hooks/useFetch';

type PhotoCommentsFormProps = {
  id: number | string;
  HandleAddComment: (e: Comment) => void;
  single: boolean;
};

const PhotoCommentsForm = ({
  id,
  HandleAddComment,
  single,
}: PhotoCommentsFormProps) => {
  const { request, error } = useFetch();
  const [comment, setComment] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const singleComment = {
      comment: comment,
    };
    console.log(singleComment);
    console.log(comment);

    const { url, options } = COMMENT_POST(id, singleComment);

    const { response, json } = await request(url, options);
    console.log(json);

    if (response.ok) {
      setComment('');
      HandleAddComment(json as Comment);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        placeholder="Comente..."
        id="comment"
        name="comment"
        value={comment}
        onChange={({ target }: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComment(target.value)
        }
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
