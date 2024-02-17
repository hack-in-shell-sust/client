import React, { useState, useEffect } from 'react';
import MapPage from './MapPage';
import { useLocation } from 'react-router-dom';

const MapDoctor = () => {
    const [markers, setMarkers] = useState([]);

    const getAllDoctors = () =>{
        
    }


  return (
    <div>
      <MapPage markers={markers} />
    </div>
  );
};

export default MapDoctor;
