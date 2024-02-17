import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

import './Profile.css'
import { Button } from "@/components/ui/button"

import {useUserContext} from '../../context/UserContext';
import NavigationBar from '../landingPage/navbar/NavigationBar';

const Profile = () => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useUserContext();

    const [firstName, setFirstName] = useState("abir");
    const [lastName, setLastName] = useState("hossain");
    const [email, setEmail] = useState("abir9@gmail.com");
    const [height, setHeight] = useState("5.7");
    const [weigth, setWeight] = useState("65kg");
    const [dob, setDob] = useState("");
    
    const logout = () => {
        localStorage.setItem('hackInShellAccessToken', '');
        localStorage.setItem('hackInShellUser', '');
        setUserInfo([]);
    }

    useEffect(() => {
        console.log(userInfo);
        if (Object.keys(userInfo).length == 0 && localStorage.getItem('hackInShellAccessToken') == '') {
            //navigate('/', { replace: true });
            //window.open("/", "_top");
        }
    }, [userInfo]);

  return (
    // <div className='profile'>
    //     <button onClick={()=>logout()}>
    //         logout
    //     </button>
    // </div>
    <>
        <NavigationBar />
        <div className='sm:flex justify-between w-[80vw] mx-auto mt-[4vw]'>
            <div className="bg-red-600 p-6 max-w-[50vw] rounded-lg shadow-lg">
                <h1 className="text-lg font-semibold text-gray-700">Profile Page</h1>
                <div className='flex gap-4 justify-end '>
                    <div className='w-[100%] flex flex-wrap justify-evenly'>
                        <div className="mt-4 w-[47%]">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                FIRST NAME
                            </label>
                            <input
                                className="shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={firstName} onChange={(event) => {setFirstName(event.target.value);}}
                            />
                        </div>

                        <div className="mt-4 w-[47%]" >
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display-name">
                                LAST NAME
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="display-name"
                                type="text"
                                placeholder="Pixel_Master88"
                                value={lastName} onChange={(event) => {setLastName(event.target.value);}}
                            />
                        </div>
                        
                        <div className="mt-4 w-[47%]">
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
                        </div>

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

                        <div className="mt-4 w-[47%]">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                LOCATION
                            </label>
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                id="location"
                            >
                                <option>Indonesia</option>
                                {/* Other options would be here */}
                            </select>
                        </div>
                    </div>
                    {/*  */}
                </div>
                <div className='flex mt-4 justify-center'>
                    <Button className='hover:bg-blue-700 mt-[2vw]'>Save Changes</Button>
                </div>
            </div>
                
            <div className='bg-green-600 w-[20vw] rounded-lg text-center pb-[2vw]'>
                <div className="w-[80%] h-[18vw] mx-auto my-[2vw] ">
                    <img  className="w-full h-full rounded-lg" src='doctors/image.jpeg' alt={'your image'} />
                </div>
                <h2 className='font-semibold'>{firstName} {lastName}</h2>
                <p>{email}</p>
                <p>{dob}</p>
                <Button className='bg-white text-black hover:bg-gray-300 w-[8vw] mt-[1vw] font-semibold' onClick={()=>logout()}>log out</Button>
            </div>
        </div>
    </>
  )
}

export default Profile