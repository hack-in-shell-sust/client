import React, {useState, useEffect} from 'react'
import './NavigationBar.css';
import {BsFillPlayCircleFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';
const NavigationBar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuToggle = (isOpen) => {
    //alert(isOpen)
    setIsSubMenuOpen(isOpen);
  };
  // const subMenuToggle = () => {
  //   document.querySelector('.homepage_navigation_submenu').classList.add('homepage_navigation_submenuToggle');
  // }
  const loginToggle = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    return (token == null || token == undefined || token == "");
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
  
  return (
    <div className="homepage_navigation">
      <div className="navigation">
        <div className="logoBar">
          <a href="/" className='my-auto'>
            <img src="/navbar/logo.png" alt="navlogo"/>
          </a>
          <div className='my-auto navBarIconBar'>
            <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger' onClick={()=> respNav()}/>
            <ImCross className='my-auto navBurgerIcon navBarIconCross' onClick={()=> respNav()}/>
          </div>
        </div>

        <div className='navMain'>
          <div className='navMenu'>
            <div className="my-auto navSubMenu">
              <Link to="/" className='navMenuPageLinks'>Home</Link> 
              <Link to="/chatlist" className='navMenuPageLinks'>Chat</Link> 
              <Link to="/projects" className='navMenuPageLinks'>Projects</Link> 
              <a href="#pricing" className='navMenuPageLinks'>Pricing</a>
              <a href="#guides" className='navMenuPageLinks'>Guides</a> 
              {
                loginToggle() ? 
                (
                  <Link to="/login" className="my-auto navbar_login">
                    <button className='mx-auto'>Log In</button>
                  </Link>
                )
                :
                (
                  <Link to="/profile" className="my-auto navbar_login">
                    <button className='mx-auto'>Profile</button>
                  </Link>
                )
              }
            </div>
            {/* {
              loginToggle() ? 
              (
                <Link to="/login" className="my-auto">
                  <button className="navbar_login ">Log in</button>
                </Link>
              ):
              (
                <Link to="/profile" className="my-auto">
                  <button className="navbar_login_profile ">Profile</button>
                </Link>
              )
            } */}
            

            {/* <a href="https://app.replymind.com/" target="_blank" rel="noopener noreferrer" className="my-auto">
              <button className="navbar_getLink mt-2 lg:mt-0">Get ReplyMind it's free!</button>
            </a> */}
          </div> 
          <div className='navExtra' onClick={()=> respNav()}></div>
        </div>
      </div>
      
      {isSubMenuOpen && (
      <div className='homepage_navigation_submenu'
        onMouseEnter={() => subMenuToggle(true)}
        onMouseLeave={() => subMenuToggle(false)}
      >
        <div className='homepage_navigation_submenuOverview'>
          <h2>Overview</h2>
          <a href="#">Human-like replies</a>
          <a href="#">Multi Lingual Capabilities</a>
          <a href="#">Keyboard Extension</a>
          <a href="#">Browser Extension</a>
          <a href="#">Supported Platforms</a>
        </div>  
        <div className='homepage_navigation_submenuOverview'>
          <h2>Who we are</h2>
          <Link to="/about">About us</Link>
          <Link to="#">Our team</Link>
          <a href="#">Career</a>
          <a href="#">Value & mission</a>
        </div>  
      </div>
      )}
    </div>
  )
}

export default NavigationBar