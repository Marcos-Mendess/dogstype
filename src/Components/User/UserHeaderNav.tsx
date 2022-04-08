import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as Adicionar } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/UseMedia';

const UserHeaderNav = () => {
  const { userLogout } = useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          arial-label="Menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink
          to="/conta"
          end
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <MinhasFotos /> {mobile && 'Minhas fotos'}
        </NavLink>
        <NavLink
          to="/conta/estatisticas"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {' '}
          <Estatisticas /> {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink
          to="/conta/postar"
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {' '}
          <Adicionar />
          {mobile && 'Adicionar foto'}
        </NavLink>
        <button onClick={userLogout}>
          <Sair /> {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
