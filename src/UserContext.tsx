import { Data } from './Hooks/useFetch';

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Hooks/api';
import { useNavigate } from 'react-router-dom';
export const UserContext = createContext<IContextType>({} as IContextType);

export interface IContextType {
  data: Data;
  login: boolean | null;
  loading: boolean;
  error: string | null;
  userLogin: (username: string, password: string) => void;
  userLogout: () => void;
}

export const UserStorage: React.FC = ({ children }) => {
  const [data, setData] = useState<Data>({} as Data);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const userLogout = useCallback(
    async function () {
      setData({} as Data);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate]
  );

  async function getUser(token: string) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      window.localStorage.setItem('token', token);
      await getUser(token);
      navigate('/conta');
    } catch (err: any) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
