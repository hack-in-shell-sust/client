import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import './Login.css'
import {useUserContext} from '../../context/UserContext';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const [pageLoading, setPageLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = () => {         
        setLoginStatus("please wait...");
        
        if(username === "" || username == null || username === undefined){
            setLoginStatus("Name is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setLoginStatus("password is empty");
        }

        // if(username==="sheikh" && password==="rub"){
        //      setLoginStatus("logging in");
        //      localStorage.setItem("localStorageUsername",username);
        //      localStorage.setItem("localStorageLoggedState",2);
        //      window.location.href = "/dashboardadmin";
        // }
        else{
            //const apipath = `${process.env.REACT_APP_API_URI}/user/login`;
            //const apipath = 'http://192.168.1.48:3001/user/login';
            const apipath = 'http://192.168.238.42:8085/api/auth/login/user'
            axios.post(apipath, 
            {
                email:username,
                password:password
            }
            ).then((response) =>{
                //alert(JSON.stringify(response.data));
                console.log(response.data.data);
                
                setLoginStatus("please wait");
                if(response.data.data.token){
                    setLoginStatus("logging in");
                    
                    const userObj=jwtDecode(response.data.data.token);
                    setUserInfo(userObj);
                    //console.log(userObj.email);
                    localStorage.setItem('hackInShellUser', JSON.stringify(userObj));
                    localStorage.setItem('hackInShellAccessToken', response.data.data.token);
                
                }
                else{
                    setLoginStatus("Wrong id or password");
                }
            })
            .catch(error => {
                //console.error(error);
                if (error.response && error.response.status === 401) {
                    setLoginStatus("Wrong id or password");
                    // Perform appropriate action, such as redirecting to login page
                } else {
                    // Handle other errors
                    setLoginStatus("Wrong id or password");
                    console.log("Error:", error.message);
                }
            });
        }

        setUsername('');
        setPassword('');
    };


    useEffect(() => {
        //console.log(userInfo);
        if (userInfo && Object.keys(userInfo).length > 0 && localStorage.getItem('hackInShellAccessToken')) {
            //navigate('/chatlist', { replace: true });
            window.open("/", "_top");
        }
    }, [userInfo]);

  return (
    <div className='login'>
        <div className='login_mainBox'>
            <h2>Login User</h2>
            <Input type="email" placeholder="Insert Email" value={username} onChange={(event) => {setUsername(event.target.value);}}/>
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <p>{loginStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>Login</Button>
            <Link to="/signup" className="login_logToSign">Don't Have an account? SignUp </Link>
        </div>
    </div>
  )
}

export default Login