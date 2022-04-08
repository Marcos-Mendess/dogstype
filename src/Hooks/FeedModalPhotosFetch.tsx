import { useCallback, useState } from 'react';
import { Comment } from './useFetch';

export interface PhotosData {
  photo?: Photo;
  comments: Comment[];
}

export interface Photo {
  acessos?: string;
  author?: string;
  date?: Date;
  id?: string | number;
  idade?: number | string;
  peso?: string;
  src?: string;
  title?: string;
  total_comments?: string;
  message?: string;
  nome?: string;
}

const FeedModalPhotosFetch = () => {
  const [data, setData] = useState<PhotosData>({} as PhotosData);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url: string, options: Partial<RequestInit | undefined>) => {
      let json: PhotosData = {} as PhotosData;
      let response: Response = {} as Response;
      try {
        setError(null);
        setLoading(true);
        response = await fetch(url, options);
        json = await response.json();
        if (json && response.ok === false) throw new Error('Erro');
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        return { response, json };
      }
    },
    []
  );

  return {
    data,
    loading,
    error,
    request,
  };
};

export default FeedModalPhotosFetch;
