import React from 'react'
import './Why.css'
import { FaStar } from "react-icons/fa";
import { FiPieChart } from "react-icons/fi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdKeyboardCommandKey } from "react-icons/md";

const Why = () => {
  return (
    <div className='why' id="whyReplyMind">
        <div className='why_mainBox'>
            <div className='why_about'>
                <h1>Why ReplyMind?</h1>
                <p>Save time maximizing engagement with your audience and strenghtening your social presence. Our platform streamlines interactions, fastering meaningful connection while amplifying your online impact</p>
                <div className='why_ratingBox'>
                    <div>
                        <div className='flex'>
                            <FaStar className='why_starIcon'/>
                            <FaStar className='why_starIcon'/>
                            <FaStar className='why_starIcon'/>
                            <FaStar className='why_starIcon'/>
                            <FaStar className='why_starIcon'/>
                        </div>
                        <h2 className='font-semibold'><b>5</b>/5 raing</h2>
                        <h3 className='font-semibold'>Chrome Web Store</h3>
                        <img src='/why/1.png'/>
                    </div>
                    <div>
                        <div className='flex'>
                            <FaStar className='why_starIcon' />
                            <FaStar className='why_starIcon' />
                            <FaStar className='why_starIcon' />
                            <FaStar className='why_starIcon' />
                            <FaStar className='why_starIcon why_starIconGrey' />
                        </div>
                        <h2 className='font-semibold'><b>4.9</b>/5 raing</h2>
                        <h3 className='font-semibold'>Play Store</h3>
                        <img src='/why/2.png'/>
                    </div>
                </div>
            </div>
            <div className='why_features'>
                <div className='flex'>
                    <div className='why_featureIcon'>
                        <FiPieChart className='mx-auto my-auto why_icon'/>
                    </div>
                    <div>
                        <h2>Save Time</h2>
                        <p>Meaningfully engaing in social media is time consuming</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='why_featureIcon'>
                        <TbActivityHeartbeat  className='mx-auto my-auto why_icon'/>
                    </div>
                    <div>
                        <h2>Boost Engagement</h2>
                        <p>Connect with your network effortlessly and maximize your presence</p>
                    </div>
                </div>
                <div className='flex'>
                    <div className='why_featureIcon'>
                        <MdKeyboardCommandKey  className='mx-auto my-auto why_icon'/>
                    </div>
                    <div>
                        <h2>Increase Social Presence</h2>
                        <p>Increased engagement boosts your social presence</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Why