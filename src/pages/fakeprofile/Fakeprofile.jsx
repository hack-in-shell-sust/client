import React from 'react';
import { Button } from "@/components/ui/button"

const ProfilePage = () => {
  return (
    <div className="bg-white p-6 max-w-md mx-auto rounded-lg shadow-md mt-6">
      <h1 className="text-lg font-semibold text-gray-700">Profile Page</h1>
      <div className='flex gap-4 justify-end '>
      <div className='w-2/3'>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          NAME
        </label>
        <input
          className="shadow appearance-none  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="John Doe"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="display-name">
          DISPLAY NAME
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="display-name"
          type="text"
          placeholder="Pixel_Master88"
        />
      </div>
      
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          E-MAIL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="johndoe@gmail.com"
        />
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="what-i-do">
          WHAT I DO
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="what-i-do"
          type="text"
          placeholder="Freelance Art Director"
        />
      </div>

      <div className="mt-4">
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
      <div className="w-1/2 h-36">
        <img  className="w-full h-full " src='/public/doctors/image.jpeg' alt={'your image'} />
        {/* <img className="w-full h-full object-cover" src={imageUrl} alt={name} /> */}
      </div>
      </div>
      <div className='flex mt-4 justify-end'>
        <Button className='hover:bg-blue-700'>Save Changes</Button>
      </div>
    </div>
  );
};

export default ProfilePage;
