import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userId:'',
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const tokenfromLocal = localStorage.getItem('token');
  const userIdfromLocal = localStorage.getItem('userId');
  const [token, setToken] = useState(tokenfromLocal);
  const [userId, setUserId] = useState(userIdfromLocal);

  const userIsLoggedIn = !!token;


  const loginHandler = (token , userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem('token',token);
    localStorage.setItem('userId',userId);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;