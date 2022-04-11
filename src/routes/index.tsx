import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { titles, TitlesTypes } from '../Components/Helper/headerTitles';
import NotFound from '../Components/Helper/NotFound';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import Photo from '../Components/Photo/Photo';
import User from '../Components/User/User';
import UserProfile from '../Components/User/UserProfile';
import { useHead } from '../Hooks/UseHead';
import { UserStorage } from '../UserContext';
import ProtectedRoute from './ProtectedRoute';

const Routers = () => {
  const { pathname } = useLocation();
  const { setStaticTitle } = useHead();
  useEffect(() => {
    setStaticTitle(titles[pathname as TitlesTypes] ?? 'Not Found');
  }, [pathname, setStaticTitle]);
  return (
    <div className="App">
      <UserStorage>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          1
        </main>
        <Footer />
      </UserStorage>
    </div>
  );
};

export default Routers;
