import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // Assuming this is the correct import path

const DoctorCard = ({ name, contact, description, isOnlineBookable, rating, longitude, latitude, clinic }) => {
  const navigate = useNavigate();

  const goToMap = (docLongitude, docLatitude, doctorName) => {
    const queryParams = new URLSearchParams({
      longitude: docLongitude,
      latitude: docLatitude,
      doctorName: doctorName
    });

    navigate(`/mapdoctor?${queryParams}`);
  };

  return (
    <div className="max-w-md rounded text-center p-6 w-[30%] doctorCard">
      <div className='flex gap-4'>
        <div className="w-[8vw] h-[11vw]">
          <img className="w-full h-[8.5vw]" src='/doctors/image.jpeg' alt={'your image'} />
          <Button className='hover:bg-blue-700 w-[100%] h-2.5vw]' onClick={() => goToMap(latitude, longitude, name)}>Find on map</Button>
        </div>
        <div className="doctorcard_textBox">
          <h3 className="text-lg text-white font-semibold">{name}</h3>
          <p className="text-sm">Speciality: {description}</p>
          <p className="text-sm">Clinic: {clinic}</p>
          <p className="text-sm">Rating: {rating}</p>
          <p className="text-sm">Phone no: {contact}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
