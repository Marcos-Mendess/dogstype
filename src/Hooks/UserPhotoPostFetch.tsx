import { useCallback, useState } from 'react';

export interface PhotoPost {
  meta_input: {
    acessos: number;
    idade: string | number;
    peso: string;
  };
}

const UserPhotoPostFetch = () => {
  const [data, setData] = useState<PhotoPost>({} as PhotoPost);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (url: string, options: Partial<RequestInit | undefined>) => {
      let json: any = [];
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

export default UserPhotoPostFetch;
