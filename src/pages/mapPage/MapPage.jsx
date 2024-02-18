import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";

import './MapPage.css'
import NavigationBar from '../landingPage/navbar/NavigationBar';


const MapPage = ({markers}) => {
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

    // Add a marker as an example
    // const marker = new mapboxgl.Marker({ color: 'red' })
    //   .setLngLat([90.37921708900197, 23.948376516259003])
    //   .addTo(map);
    
  
    
  //   markers.forEach(marker => {
  //     new mapboxgl.Marker({
  //         color: 'red', // Set marker color to red
  //         scale: 5.5 // Increase marker size (default is 1)
  //     }).setLngLat([marker.longitude, marker.latitude])
  //     .setPopup(
  //         new mapboxgl.Popup().setText(marker.doctorName)
  //     )
  //     .addTo(map);
  // });

  markers.forEach(marker => {
    // Create a custom marker element
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.style.width = '20px'; // Adjust the width as needed
    el.style.height = '20px'; // Adjust the height as needed
    el.style.backgroundColor = 'red'; // Set the background color to red
    el.style.borderRadius = '50%'; // Ensure the marker is circular
    el.style.border = '2px solid white'; // Add a border for better visibility
    el.style.cursor = 'pointer'; // Se

    // Set the marker position and add it to the map
    new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(
            new mapboxgl.Popup().setText(marker.doctorName)
        )
        .addTo(map);
});
  
  
      // Cleanup
      return () => map.remove();
  }, []);

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
