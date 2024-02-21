import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

import './MapPage.css'
import NavigationBar from '../landingPage/navbar/NavigationBar';


const MapPage = ({markers}) => {
  //const [markers, setMarkers] = useState([]);
  const mapContainerRef = useRef(null);
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    // Initialize Mapbox GL on first render
    console.log(markers.size);
    console.log(markers);
    mapboxgl.accessToken = mapboxAccessToken;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.40145, 23.911271],// Center coordinates
      zoom: 7 // Initial zoom level
    });

    //Add a marker as an example
    // const marker = new mapboxgl.Marker({ color: 'red' })
    //   .setLngLat([90.37921708900197, 23.948376516259003])
    //   .addTo(map);
    
    markers.forEach(marker => {
        new mapboxgl.Marker({
            color: 'red', // Set marker color to red
            scale: 1 // Increase marker size (default is 1)
        }).setLngLat([marker.longitude, marker.latitude])
        .setPopup(
            new mapboxgl.Popup().setText(marker.doctorName)
        )
        .addTo(map);
    });
  
      // Cleanup
      return () => map.remove();
  }, [markers, mapboxAccessToken]);

  // useEffect(() => {
  //   // Add initial markers
  //   setMarkers([
  //     { longitude: 90.37921708900197, latitude: 23.948376516259003, doctorName: "Abir Hossain" },
  //     { longitude: 90.4, latitude: 23.9, doctorName: "Tafsir Rahman" }, // Additional marker
  //     { longitude: 90.45, latitude: 23.85, doctorName: "Will smith" }, // Additional marker
  //     // Add more markers as needed
  //   ])
  // } ,[]);

  return (
    <>
        <NavigationBar/>
        <div 
            ref={mapContainerRef} 
            style={{ height: "40vw", width: "90%", margin: "auto", marginTop:"2vw"}} 
        />
    </>
  )
};

export default MapPage;
