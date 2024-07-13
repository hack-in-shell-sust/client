import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../landingPage/navbar/NavigationBar';

const DoctorProfile = () => {
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            console.log(id);
            try {
                const response = await axios.post(`http://172.27.32.35:8080/api/doctor/info`, { 
                    id: id,

                });
                setDoctorInfo(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctor information:', error);
                setLoading(false);
            }
        };

        fetchDoctorInfo();
    }, [id]);

    return (
        <>
        <NavigationBar/>
        <div className='mt-[4vw]'>
            {loading ? (
                <div>Loading...</div>
            ) : doctorInfo ? (
                <div className='w-[20vw] rounded-lg text-center pb-[2vw] border shadow-lg bg-green-600 mx-auto'>
                    <div className="w-[80%] h-[18vw] mx-auto my-[2vw] ">
                        <img className="w-full h-full rounded-lg" src='doctors/image.jpeg' alt={'your image'} />
                    </div>
                    <h2 className='font-semibold'>{doctorInfo.name}</h2>
                    <p className='text-black'>{doctorInfo.contact}</p>
                    <p>{doctorInfo.description}</p>
                    <p>{doctorInfo.rating}</p>
                    
                </div>
            ) : null}
        </div>
        </>
    );
}

export default DoctorProfile;
