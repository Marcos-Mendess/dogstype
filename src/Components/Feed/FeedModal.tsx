import React, { useEffect } from 'react';
import { PHOTO_GET } from '../../Hooks/api';
import FeedModalPhotosFetch from '../../Hooks/FeedModalPhotosFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import styles from './FeedModal.module.css';
import { IFeedPhotosItem } from './FeedPhotosItem';

const FeedModal = ({ photo, setModalPhoto }: IFeedPhotosItem) => {
  const { data, error, loading, request } = FeedModalPhotosFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id!);
    const cache = options.cache as RequestCache;
    request(url, { ...options, cache });
  }, [photo, request]);

  function handleOutsideClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
