import { Photo } from '../../Hooks/FeedModalPhotosFetch';
import { useEffect } from 'react';
import { PHOTOS_GET } from '../../Hooks/api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css';

export interface IFeedPhotos {
  page: number;
  user: string | number;
  setModalPhoto: (photo: Photo | null) => void;
  setInfinite: (e: boolean) => void;
  data?: Photo[];
  response?: Response;
}

const FeedPhotos = ({
  page,
  user,
  setModalPhoto,
  setInfinite,
}: IFeedPhotos) => {
  const { data, loading, error, request } = useFetch();
  useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      const { url, options } = PHOTOS_GET(page, total, user);
      const cache = options.cache as RequestCache;
      const { response, json } = await request(url, { ...options, cache });
      if (response && response.ok && json.length < total) setInfinite(false);
    }
    fetchPhotos();
  }, [request, user, page, setInfinite]);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
