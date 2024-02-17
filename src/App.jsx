import React, { useState, useEffect } from 'react'
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import './App.css'

import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import LandingPage from './pages/landingPage/LandingPage';

import Chat from './pages/chat/Chat';
import Profile from './pages/profile/Profile';
import {UserProvider} from './context/UserContext';
import MapPage from './pages/mapPage/MapPage';



const App = () => {
  // let token = localStorage.getItem('hackInShellAccessToken');

  const checkToken = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    return (token == null || token == undefined || token == "");
  }
  
  // const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   if(token == null || token == undefined || token == ""){
  //     setLoggedIn(false);
  //   }
  //   else{
  //     setLoggedIn(true);
  //   }
  // }, [token]);

  return (
    <>
      
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={ <LandingPage />} />
            <Route path="/login" element={checkToken() ? <Login /> : <Navigate to="/chatlist" />} />
            <Route path="/signup" element={checkToken() ? <Signup /> : <Navigate to="/chatlist" />} />
            <Route path='/chat' element={checkToken() ? <Navigate to="/login" />  : <Chat/>} />
            <Route path="/profile" element={checkToken() ? <Navigate to="/login" /> : <Profile/>} />
            {/* <Route path="/map" element={checkToken() ? <Navigate to="/login" /> : <MapPage/>} /> */}
            <Route path="/map" element={<MapPage/>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
      

    </>
  )
}

export default App