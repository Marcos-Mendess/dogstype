import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import NotFound from '../Components/Helper/NotFound';
import Home from '../Components/Home/Home';
import Login from '../Components/Login/Login';
import Photo from '../Components/Photo/Photo';
import User from '../Components/User/User';
import UserProfile from '../Components/User/UserProfile';
import { UserStorage } from '../UserContext';
import ProtectedRoute from './ProtectedRoute';

const Routers = () => {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
};

export default Routers;
