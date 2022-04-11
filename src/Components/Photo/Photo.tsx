import React from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { PHOTO_GET } from '../../Hooks/api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from './PhotoContent';
import FeedModalPhotosFetch from '../../Hooks/FeedModalPhotosFetch';

function Photo() {
  const { id } = useParams();
  const { data, loading, error, request } = FeedModalPhotosFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id!);
    const cache = options.cache as RequestCache;
    request(url, { ...options, cache });
  }, [request, id]);
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
}

export default Photo;
