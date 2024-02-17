import React from 'react';
import DoctorCard from '@/mycomponenrs/loading/Doctorcard';
import NavigationBar from '../landingPage/navbar/NavigationBar';

const doctors = [
  { id: 1, name: 'Dr. Jane Doe', specialty: 'Cardiologist', imageUrl: 'doctors/image1.jpg' , booked: true},
  { id: 2, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'doctors/image2.jpg' , booked: false},
  { id: 3, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'doctors/image2.jpg' , booked: false},
];

const DoctorList = ({}) => {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-wrap w-[90vw] bg-blue-600 mx-auto justify-evenly">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              specialty={doctor.specialty}
              imageUrl={doctor.imageUrl}
              booked={doctor.booked}
            />
          ))}
      </div>
    </>
  );
};

export default DoctorList;
