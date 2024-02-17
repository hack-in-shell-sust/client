import React from 'react'
import './Footer.css'
import { CiMail } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaAndroid } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer'>
        <div className='footer_mainBox'>
            <div className='footer_contacts'>
                <img src="/navbar/logo.png" />
                <h2>RepplyMind AI Ltd is a Bangladeshi startup dedicated to develop the next-generation product for social interactions.</h2>
                <div className='footer_contact'>
                    <CiMail className='footer_contact_icon'/>
                    <div>
                        <p>hello@replymind.com</p>
                        <p>support@replymind.com</p>
                    </div>
                </div>
                <div className='footer_contact'>
                    <MdOutlinePhoneInTalk className='footer_contact_icon'/>
                    <div>
                        <p>+88016 86 625906</p>
                        <p>+88017 56 558800</p>
                    </div>
                </div>
            </div>

            <div className='footer_support'>
                <h2>Support</h2>
                <a href="#">Talk to support</a>
                <a href="#">Account information</a>
                <a href="#">About</a>
                <a href="#">Contact us</a>
            </div>

            <div className='footer_solution'>
                <h2>Solution</h2>
                <a href="#">Community</a>
                <a href="#">Affiliate</a>
                <a href="#">Road map</a>
                <a href="#">Blog</a>
            </div>

            {/* <div className='footer_download'>
                <div className='footer_download_mainBox'>
                    <p>Download</p>
                    <h2>ReplyMind keyboard extension is now available on Goggle Play Store</h2>
                    <button className='footer_download_mainBoxButton'>
                        <FaAndroid className='footer_download_mainBoxIcon'/>
                        <h2>PLay Store</h2>
                    </button>
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Footer