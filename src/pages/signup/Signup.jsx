import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import './Signup.css'
import {useUserContext} from '../../context/UserContext';

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupStatus, setSignupStatus] = useState("");
    const [pageLoading, setPageLoading] = useState(false);

    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const loginUser = () => {         
        setSignupStatus("please wait...");
        
        if(userName === "" || userName == null || userName === undefined){
            setSignupStatus("Name is empty");
        }
        if(userName === "" || userName == null || userName === undefined){
            setSignupStatus("Name is empty");
        }
        else if(userEmail === "" || userEmail == null || userEmail === undefined){
            setRegStatus("Email is empty");
        }
        else if(password === "" || password == null || password === undefined){
            setSignupStatus("password is empty");
        }
        else if(confirmPassword === "" || confirmPassword == null || confirmPassword === undefined){
            setSignupStatus("confirm password is empty");
        }
        else if(password != confirmPassword){
            setSignupStatus("password and confirm password dont match");
        }

        // if(username==="sheikh" && password==="rub"){
        //      setLoginStatus("logging in");
        //      localStorage.setItem("localStorageUsername",username);
        //      localStorage.setItem("localStorageLoggedState",2);
        //      window.location.href = "/dashboardadmin";
        // }
        else{
            // const apipath = `${process.env.REACT_APP_API_URI}/user/login`;
            const apipath = 'http://192.168.238.113:8085/api/auth/register/user'
            Axios.post(apipath, 
            {
                firstName:userName,
                lastName: lastName,
                email: userEmail,
                password:password
            }
            ).then((response) =>{
                //alert(JSON.stringify(response.data));
                // console.log(response);
                console.log(response.data);
                setSignupStatus("please wait");
                if(response.data.firstName){
                    navigate('/login', { replace: true });
                    //const userObj=jwtDecode(response.data.data.token);
                    // setUserInfo(userObj);
                    // localStorage.setItem('hackInShellUser', JSON.stringify(userObj));
                    // localStorage.setItem('hackInShellAccessToken', response.data.data.token);
                }
                else{
                    setSignupStatus("Email already taken");
                }
            })
            .catch(error => {
                //console.error(error);
                setSignupStatus("Name already taken");
                if (error.response && error.response.status === 401) {
                    // setSignupStatus("Name already taken");
                    // Perform appropriate action, such as redirecting to login page
                } else {
                    // setSignupStatus("Name already taken");
                    console.log("Error:", error.message);
                }
            });
        };

        setUserName('');
        setLastName('');
        setUserEmail('');
        setPassword('');
        setConfirmPassword('')
    };

    useEffect(() => {
        //console.log(userInfo);
        if (userInfo && Object.keys(userInfo).length > 0) {
            //window.open("/chatlist", "_top");
        }
    }, [userInfo]);

  return (
    <div className='signup'>
        <div className='signup_mainBox'>
            <h2>Signup User</h2>
            <Input type="text" placeholder="Insert First name" value={userName} onChange={(event) => {setUserName(event.target.value);}}/>
            <Input type="text" placeholder="Insert Last name" value={lastName} onChange={(event) => {setLastName(event.target.value);}}/>
            <Input type="email" placeholder="Insert Email" value={userEmail} onChange={(event) => {setUserEmail(event.target.value);}}/>
            <Input type="password" placeholder="Insert Password" value={password} onChange={(event) => {setPassword(event.target.value);}}/>
            <Input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value);}}/>
            <p>{signupStatus}</p>
            <Button variant="outline" onClick={()=>loginUser()}>Save</Button>
            <Link to="/login" className="signup_signToLog">Already Have an account? log in </Link>
        </div>
    </div>
  )
}

export default Signup;