import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css'

import {useUserContext} from '../../context/UserContext';

const Profile = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();
    
    const logout = () => {
        localStorage.setItem('hackInShellAccessToken', '');
        localStorage.setItem('hackInShellUser', '');
        setUserInfo([]);
    }

    useEffect(() => {
        console.log(userInfo);
        if (Object.keys(userInfo).length == 0 && localStorage.getItem('hackInShellAccessToken') == '') {
            //navigate('/', { replace: true });
            window.open("/", "_top");
        }
    }, [userInfo]);

  return (
    <div className='profile'>
        <button onClick={()=>logout()}>
            logout
        </button>
    </div>
  )
}

export default Profile