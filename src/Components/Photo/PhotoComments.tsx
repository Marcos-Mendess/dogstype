import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Comment } from '../../Hooks/useFetch';

interface IPhotoComments {
  comments: Comment[];
  single?: boolean;
  id?: number | string;
}

const PhotoComments = (props: IPhotoComments) => {
  const [comments, setComments] = useState(props.comments);
  const commentsSection = useRef<HTMLUListElement>(null);
  const { login } = useContext(UserContext);

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  const HandleAddComment = (comment: Comment) => {
    setComments((comments) => [...comments, comment]);
  };

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {props.comments?.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props.single!}
          id={props.id!}
          HandleAddComment={HandleAddComment}
        />
      )}
    </>
  );
};

export default PhotoComments;
