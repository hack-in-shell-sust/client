import React, { useEffect } from 'react';
import MapPage from './MapPage';
import { useLocation } from 'react-router-dom';

const MapDoctor = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const longitude = params.get('longitude');
  const latitude = params.get('latitude');
  const doctorName = params.get('doctorName');

  // Create an array of marker objects
  const markers = [
    {
      doctorName: doctorName,
      longitude: parseFloat(longitude), // Convert to float if necessary
      latitude: parseFloat(latitude),   // Convert to float if necessary
    }
  ];

  return (
    <div>
      <MapPage markers={markers} />
    </div>
  );
};

export default MapDoctor;
