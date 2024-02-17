import React from 'react';
import { Button } from "@/components/ui/button"



const DoctorCard = ({ name, specialty ,imageUrl , booked }) => {
  return (
    <>
    <div className="max-w-md rounded shadow-lg text-center p-6 w-[30%]">
      <div className='flex gap-4'>
      <div className="w-1/2 h-36">
        <img  className="w-full h-full " src='/public/doctors/image.jpeg' alt={'your image'} />
        {/* <img className="w-full h-full object-cover" src={imageUrl} alt={name} /> */}
      </div>
      <div className="w-1/2">
        <h3 className="text-lg text-gray-900 font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm">{specialty}</p>
      </div>
      </div>
      <div className="flex mt-4 gap-2 justify-evenly"> 
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded">
          Book Appointment
        </button> */}
        { booked ? 
        <Button className='hover:bg-blue-700'>Book Appointment</Button>
        : <Button className='hover:bg-blue-700'>No free slot </Button>
        }
        
        <Button className='hover:bg-blue-700'>Find on map</Button>
        </div>
    </div>
  </>
  );
};

export default DoctorCard;
