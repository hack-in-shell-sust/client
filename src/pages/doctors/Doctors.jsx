import React from 'react';
import DoctorCard from '@/mycomponenrs/loading/Doctorcard';

const doctors = [
  { id: 1, name: 'Dr. Jane Doe', specialty: 'Cardiologist', imageUrl: 'public/doctors/image1.jpg' , booked: true},
  { id: 2, name: 'Dr. John Smith', specialty: 'Neurologist', imageUrl: 'public/doctors/image2.jpg' , booked: false},
];

const DoctorList = ({}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default DoctorList;
