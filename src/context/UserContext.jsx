// UserContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState([]);
  
  const fetchData = () => {
    const hackInShellUser = localStorage.getItem('hackInShellUser');
    if(hackInShellUser && userInfo != JSON.parse(hackInShellUser)) {
      setUserInfo(JSON.parse(hackInShellUser));
    }
    // if(hackInShellUser) {
    //   setUserInfo(JSON.parse(hackInShellUser));
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};

//export default UserContext;
