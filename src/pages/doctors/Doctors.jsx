import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '@/mycomponenrs/loading/Doctorcard';
import NavigationBar from '../landingPage/navbar/NavigationBar';
import axios from 'axios';
import './Doctors.css'
import Loading from '@/mycomponenrs/loading/Loading';
import { Button } from '@/components/ui/button';

// const doctors = [
//   { id: 1, name: 'Dr. Jane Doe', specialty: 'Cardiologist', imageUrl: 'doctors/image1.jpg' , booked: true},
//   { id: 2, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'doctors/image2.jpg' , booked: false},
//   { id: 3, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'doctors/image2.jpg' , booked: false},
//   { id: 4, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'doctors/image2.jpg' , booked: false},
// ];

const DoctorList = () => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [pageLoading, setPageLoading] = useState(true);

  const [allDoctors, setAllDoctors] = useState([]);
  const [marker, setMarker] = useState([]);

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
    const apipath = 'http://192.168.238.42:8085/api/doctor/nearest/center'
    try{
        const response = await axios.post(apipath,
        {
            longitude:longitude,
            latitude: latitude
        }
        ); 

        // console.log(response.data);
        
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
          setMarker(formattedDoctors.map(doctor => ({latitude: doctor.latitude, longitude: doctor.longitude})));
          console.log(formattedDoctors);
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
    if(longitude != 0)getDoctors();
  }, [longitude]);


  // if(pageLoading){
  //   return(
  //     <Loading/>
  //   )
  // }



  return (
    <>
      <NavigationBar />
      <div className="flex flex-wrap w-[90vw] mx-auto justify-evenly mt-[3vw]">
          {allDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              contact={doctor.contact}
              description={doctor.specialization}
              isOnlineBookable={doctor.isOnlineBookable}
              rating={doctor.rating}
              longitude={doctor.longitude}
              latitude={doctor.latitude}
              clinic={doctor.clinicName}
            />
          ))}
          {/* <DoctorCard
            
            /> */}
      </div>
    </>
  );
};

export default DoctorList;
