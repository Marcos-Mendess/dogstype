import { Route, Routes } from 'react-router';
import { useContext } from 'react';
import Feed from '../Feed/Feed';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats/UserStats';
import { UserContext } from '../../UserContext';
import NotFound from '../Helper/NotFound';
import Head from '../Helper/Head';

const User = () => {
  const { data } = useContext(UserContext);
  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
