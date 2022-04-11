import { useCallback, useState } from 'react';
import { Photo } from './FeedModalPhotosFetch';

export interface Comment {
  comment_ID?: string;
  comment_author?: string;
  comment_author_email?: string;
  comment_author_url?: string;
  comment_content?: string;
  comment_post_ID?: string;
  comment_type?: string;
  user_id?: string;
  comment?: string;
}

export interface PhotoPost {
  meta_input: {
    acessos: number;
    idade: string | number;
    peso: string;
  };
}

export interface Data extends Photo, PhotoPost {
  username?: string;
  acessos?: string;
  author?: string;
  date?: Date;
  id?: string;
  idade?: string;
  peso?: string;
  src?: string;
  title?: string;
  total_comments?: string;
  message?: string;
  nome?: string;
  photo?: Photo;
  comments?: Comment[];
}

const useFetch = () => {
  const [data, setData] = useState<Data[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url: string, options: Partial<RequestInit | undefined>) => {
      let json: any[] = [];
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

export default useFetch;
