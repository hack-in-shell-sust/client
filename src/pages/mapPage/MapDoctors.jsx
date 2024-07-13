import React, { useState, useEffect } from 'react';
import MapPage from './MapPage';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const MapDoctors = () => {
    const [markers, setMarkers] = useState([]);
    let marker=[];
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const [pageLoading, setPageLoading] = useState(true);
    const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        // Check if geolocation is supported by the browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                error => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } 
        else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    const getDoctors = async () => { 
        const apipath = 'http://172.27.32.35:8080/api/doctor/nearest/center';
        try{
            const response = await axios.post(apipath, {
                longitude: longitude,
                latitude: latitude
            }); 
            
            if(response.data){
                setPageLoading(false);
                const formattedDoctors = response.data.map(doctor => ({
                    id: doctor[0],
                    name: doctor[1],
                    phoneNumber: doctor[2],
                    available: doctor[3],
                    specialization: doctor[4],
                    rating: doctor[5],
                    clinicId: doctor[6],
                    clinicName: doctor[7],
                    latitude: doctor[8],
                    longitude: doctor[9],
                    distance: doctor[10]
                }));
                setAllDoctors(formattedDoctors);
                //console.log(formattedDoctors);
                marker = formattedDoctors.map(doctor => ({latitude: doctor.latitude, longitude: doctor.longitude, doctorName:doctor.name}));
                console.log(marker);
              }
            
        } catch (error) {
            setPageLoading(false);
            console.error("Error getting doctors:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
            }
        }    
    }

    useEffect(() => {
        if(longitude !== 0) getDoctors();
    }, [longitude]);

    
    useEffect(() => {
     
    }, [marker]);

    return (
        <div>
            <MapPage markers={marker} />
        </div>
    );
};

export default MapDoctors;
