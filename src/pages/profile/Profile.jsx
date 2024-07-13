import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Profile.css'
import { Button } from "@/components/ui/button"

import {useUserContext} from '../../context/UserContext';
import NavigationBar from '../landingPage/navbar/NavigationBar';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weigth, setWeight] = useState("");
    const [dob, setDob] = useState("");
    const [description, setDescription] = useState("");
    
    const logout = () => {
        localStorage.setItem('hackInShellAccessToken', '');
        localStorage.setItem('hackInShellUser', '');
        setUserInfo([]);
    }

    useEffect(() => {
        //console.log(userInfo);
        if (Object.keys(userInfo).length == 0 && localStorage.getItem('hackInShellAccessToken') == '') {
            //navigate('/', { replace: true });
            window.open("/", "_top");
        }
    }, [userInfo]);

    const getInfo = async () => {
        const apipath = 'http://172.27.32.35:8080/api/user'
        try{
            const response = await axios.post(apipath,
            {
                email: userInfo.email,
            }
            ); 
            if(response.data){
                console.log(response.data);
                setName(response.data.name);
                setDob(response.data.dateOfBirth);
                setHeight(response.data.height)
                setWeight(response.data.weigth)
                setDescription(response.data.description);
            }
        } catch (error) {
            // setPageLoading(false);
            console.error("Error getting doctors:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
        }    
    }

    
    const updateInfo = async () => {
        // alert("taf");
        const apipath = 'http://172.27.32.35:8080/api/user/update'
        try{
            const response = await axios.post(apipath,
            {
                email: userInfo.email,
                name: firstName,
                dateOfBirth: dob,
                weigth: weigth,
                heightL:height,
                description: description,
            }
            ); 
            if(response){
                console.log(response);
                navigate('/', { replace: true });
            }
        } catch (error) {
            // setPageLoading(false);
            console.error("Error getting doctors:", error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
        }    
    }
    
    useEffect(() => {
        getInfo();
    },[]);

  return (
    // <div className='profile'>
    //     <button onClick={()=>logout()}>
    //         logout
    //     </button>
    // </div>
    <>
        <NavigationBar />
        <div className='sm:flex justify-between w-[80vw] mx-auto mt-[4vw]'>
            <div className=" p-6 max-w-[50vw] rounded-lg shadow-lg border">
                <h1 className="text-lg font-semibold text-gray-700">Profile Page</h1>
                <div className='flex gap-4 justify-end '>
                    <div className='w-[100%] flex flex-wrap justify-evenly'>
                        <div className="mt-4 w-[47%]">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                NAME
                            </label>
                            <input
                                className="shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={firstName} onChange={(event) => {setFirstName(event.target.value);}}
                            />
                        </div>
                        
                        {/* <div className="mt-4 w-[47%]">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                E-MAIL
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                value={email} onChange={(event) => {setFEmail(event.target.value);}}
                            />
                        </div> */}

                        <div className="mt-4 w-[47%]">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="what-i-do">
                                Date of Birth
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="what-i-do"
                                type="text"
                                placeholder="Date of Birth"
                                value={dob} onChange={(event) => {setDob(event.target.value);}}
                            />
                        </div>

                        <div className="mt-4 w-[47%]" >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display-name">
                                WEIGHT
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="display-name"
                                type="text"
                                placeholder="Pixel_Master88"
                                value={weigth} onChange={(event) => {setWeight(event.target.value);}}
                            />
                        </div>

                        <div className="mt-4 w-[47%]" >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display-name">
                                HEIGHT
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="display-name"
                                type="text"
                                placeholder="Pixel_Master88"
                                value={height} onChange={(event) => {setHeight(event.target.value);}}
                            />
                        </div>

                        <div className="mt-4 w-[47%]" >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display-name">
                                DESCRIPTION
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="display-name"
                                type="text"
                                placeholder="Pixel_Master88"
                                value={description} onChange={(event) => {setDescription(event.target.value);}}
                            />
                        </div>

                    </div>
                    {/*  */}
                </div>
                <div className='flex mt-4 justify-center'>
                    <Button className='hover:bg-blue-700 mt-[2vw]' onClick={()=>updateInfo()}>Save Changes</Button>
                </div>
            </div>
                
            <div className='w-[20vw] rounded-lg text-center pb-[2vw] border shadow-lg'>
                <div className="w-[80%] h-[18vw] mx-auto my-[2vw] ">
                    <img  className="w-full h-full rounded-lg" src='doctors/image.jpeg' alt={'your image'} />
                </div>
                <h2 className='font-semibold'>{firstName} {lastName}</h2>
                <p>{email}</p>
                <p>{dob}</p>
                <Button className='bg-black text-white hover:bg-gray-300 w-[8vw] mt-[1vw] font-semibold' onClick={()=>logout()}>log out</Button>
            </div>
        </div>
    </>
  )
}

export default Profile