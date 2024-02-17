import React from 'react'
import './Heromain.css';
const Heromain = () => {
  return (
    <div className='heromain_background'>
        <div className='heromain'>
            <div className='heromain_mainBox'>
                <h1>Need a sentence for heromain that is powerfull and bold for tagline</h1>
                <h2 className='font-semibold'>Subheader small sentence under</h2>
                <div className='heromain_buttonBox'>
                    <a href="https://app.replymind.com/" target="_blank" rel="noopener noreferrer" className="heromain_extensionButton">
                        <p className="mx-auto my-auto font-semibold">Do something</p>
                    </a>
                    <a href="https://app.replymind.com/" target="_blank" rel="noopener noreferrer" className="heromain_installButton">
                        <p className="mx-auto my-auto text-white font-semibold">Do another thing</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Heromain