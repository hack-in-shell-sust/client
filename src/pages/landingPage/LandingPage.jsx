import React from 'react'
import NavigationBar from './navbar/NavigationBar';
import Heromain from './heromain/Heromain';
import CopyRight from './copyright/CopyRight';
import Footer from '@/mycomponenrs/footer/Footer';
import Work from './works/Works';
const LandingPage = () => {
  return (
    <>
        <NavigationBar/>
        <Heromain/>
        <Work/>
        <Footer/>
        <CopyRight/>
    </>
  )
}

export default LandingPage