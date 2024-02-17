import React, {useState, useEffect} from 'react'
import './NavigationBar.css'
import { Link } from 'react-router-dom'
import {BsFillPlayCircleFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {GiHamburgerMenu} from 'react-icons/gi';
import {useUserContext} from '../../../context/UserContext';

const NavigationBar = () => {
  const {userInfo, setUserInfo} = useUserContext();
  var count=0;
  
  const respNav = () => {   
    count=(count+1)%2;
    var navMenu=document.querySelector(`.navMain`);
    if(count == 1){
      navMenu.style.transform = 'translateY(0)';
      navMenu.style.visibility ="visible";
      
      document.querySelector('.navBarIconBurger').style.visibility='hidden';
      document.querySelector('.navBarIconCross').style.visibility='visible';
    }
    else{
      navMenu.style.transform = 'translateY(-50vh)';
      navMenu.style.visibility ="hidden";

      document.querySelector('.navBarIconBurger').style.visibility='visible';
      document.querySelector('.navBarIconCross').style.visibility='hidden';
    }
  }

  
  useEffect(() => {
    const componentSlide = () => {
      var sectionId = window.location.hash.substring(1);
      //alert(sectionId);
    
      // Check if the section ID exists and corresponds to an element on the page
      if (sectionId) {
        var targetSection = document.getElementById(sectionId);
    
        // Scroll to the target section smoothly
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'auto'
          });
        }
      }
    }

    setTimeout(() => {
      componentSlide();
    }, 150);
  }, []);


  //screen size responsive
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <>
        <div className="navigation">
            <div className="logoBar">
               <a href="/"><img src="/navbar/logo.png" alt="navlogo" className='my-auto'/></a>
               <div className='my-auto navBarIconBar'>
                  <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger' onClick={()=> respNav()}/>
                  <ImCross className='my-auto navBurgerIcon navBarIconCross' onClick={()=> respNav()}/>
               </div>
            </div>
            <div className='navMain'>
                <div className='navMenu'>
                  
                {
                  userInfo == null || Object.keys(userInfo).length == 0 ? (
                    <React.Fragment>
                      <div className="my-auto navSubMenu">
                        <a href="#features" className='navMenuPageLinks'>Feature</a>
                        <a href="#pricing" className='navMenuPageLinks'>Pricing</a>
                        <a href="/map" className='navMenuPageLinks'>Map</a>
                        <a href="/profile" className='navMenuPageLinks'>Profile</a>
                      </div>
                      <Link to='/Login' className='my-auto tryLink '>Login</Link>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div className="my-auto navSubMenu">
                        <a href="#features" className='navMenuPageLinks'>Feature</a>
                        <a href="#pricing" className='navMenuPageLinks'>Pricing</a>
                        <a href="#faq" className='navMenuPageLinks'>FAQ</a>
                        <a href="/profile" className='navMenuPageLinks'>Profile</a>
                      </div>
                      <p>{userInfo}</p>
                    </React.Fragment>
                  )
                }
                </div> 
                <div className='navExtra' onClick={()=> respNav()}></div>
            </div>
        </div>
    </>
  )
}

export default NavigationBar