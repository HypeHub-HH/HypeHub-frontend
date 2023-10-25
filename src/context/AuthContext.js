import * as React from 'react';
import authorizedApi from '../services/AuthorizedAxios.js';

const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const axiosLogin = async () => {
      try {
        const response = await authorizedApi.get('/Authentication/GetCurrentAccount');
        setCurrentUser({
          accountId: response.data.accountId,
          userName: response.data.userName,
          email: response.data.email,
          isPrivate: response.data.isPrivate,
          avatarURL: response.data.avatarURL,
          roles: response.data.roles,
        });
      } catch (error) {
        logout();
        console.error(error);
      }
    };
    if (token !== null) axiosLogin();
  }, []);

  const login = (data) => {
    localStorage.setItem('ACCESS_TOKEN', data.token);
    localStorage.setItem('REFRESH_TOKEN', data.refreshToken);
    setCurrentUser({
      accountId: data.accountId,
      userName: data.userName,
      email: data.email,
      isPrivate: data.isPrivate,
      avatarURL: data.avatarURL,
      roles: data.roles,
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
  };

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
