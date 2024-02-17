import React, { useState, useEffect } from 'react';
//const GazeCloudAPI = window.GazeCloudAPI;
const GazeRecorder = () => {
    const [gazeData, setGazeData] = useState('');
    const [headPoseData, setHeadPoseData] = useState('');
    const [headRotData, setHeadRotData] = useState('');

    const [expRunning, setExpRunning] = useState(false);
    const [imageCounter, setImageCounter] = useState(0);

    // document.head.appendChild(script);
        const PlotGaze = (GazeData) => {
            setGazeData(`GazeX: ${GazeData.GazeX} GazeY: ${GazeData.GazeY}`);
            setHeadPoseData(`HeadX: ${GazeData.HeadX} HeadY: ${GazeData.HeadY} HeadZ: ${GazeData.HeadZ}`);
            setHeadRotData(`Yaw: ${GazeData.HeadYaw} Pitch: ${GazeData.HeadPitch} Roll: ${GazeData.HeadRoll}`);
    
            var x = GazeData.docX;
            var y = GazeData.docY;
    
            var gaze = document.getElementById("gaze");
            x -= gaze.clientWidth / 2;
            y -= gaze.clientHeight / 2;
    
            gaze.style.left = x + "px";
            gaze.style.top = y + "px";
    
            if(GazeData.state != 0)
            {
                if( gaze.style.display  == 'block')
                gaze  .style.display = 'none';
            }
            else
            {
                if( gaze.style.display  == 'none')
                gaze  .style.display = 'block';
            }
        };

    const startEyeTracking = () => {
      GazeCloudAPI.StartEyeTracking();
    };
      
    const stopEyeTracking = () => {
      setExpRunning(false);
      GazeCloudAPI.StopEyeTracking();
    };
    
    useEffect(() => {
        GazeCloudAPI.OnCalibrationComplete = () => { 
          console.log('gaze Calibration Complete');
          setExpRunning(true);
          setTimer(3);
        }
        GazeCloudAPI.OnCamDenied = () => { console.log('camera  access denied') }
        GazeCloudAPI.OnError = (msg) => { console.log('err: ' + msg) }
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = PlotGaze;
    }, []);

    useEffect(()=> {
      if(imageCounter>10){
        stopEyeTracking();
      }
    },[]);

    


    //image slide show here
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [shuffledIndexes, setShuffledIndexes] = useState([]);
    const [timer, setTimer] = useState(3);
    const [isBlank, setIsBlank] = useState(false);
    

    const showImageTime = 3000; // 3 seconds
    const blankScreenTime = 1000; // 1 second
    const totalPhotos = 10;

    // Function to shuffle the indexes array
    const shuffleIndexes = () => {
      const shuffledArray = Array.from({ length: totalPhotos }, (_, index) => index);
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      setShuffledIndexes(shuffledArray);
    };

    useEffect(() => {
      shuffleIndexes(); // Initial shuffle
  
      const slideshowTimer = setInterval(() => {
        setIsBlank(true); // Show blank screen
        
        setTimeout(() => {
          setIsBlank(false); // Hide blank screen
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalPhotos);
          //setImageCounter(imageCounter+1);
          
          setTimer(showImageTime / 1000); // Set the timer to the showImageTime in seconds
          
          const countdownTimer = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
  
          setTimeout(() => {
            clearInterval(countdownTimer);
            setTimer(blankScreenTime / 1000); // Set the timer to the blankScreenTime in seconds
          }, showImageTime);

        }, blankScreenTime);
  
      }, showImageTime + blankScreenTime);
  
      return () => {
        clearInterval(slideshowTimer);
      };
    }, []);


  return (
    <>
      <div>
        <h1>GazeCloudAPI integration example</h1>
        <button type="button" onClick={() => startEyeTracking()}>Start</button>
        <button type="button" onClick={() => stopEyeTracking()}>Stop</button>
        <div>
          <p>
            Real-Time Result:
          </p>
          <p id="GazeData">{gazeData}</p>
          <p id="HeadPhoseData">{headPoseData}</p>
          <p id="HeadRotData">{headRotData}</p>
        </div>
        <div id="gaze" style={{ position: 'absolute', display: 'none', width: '100px', height: '100px', borderRadius: '50%', border: 'solid 2px rgba(255, 255,255, .2)', boxShadow: '0 0 100px 3px rgba(125, 125,125, .5)', pointerEvents: 'none', zIndex: '999999' }}></div>
      </div>

      <div>
      {currentImageIndex < totalPhotos && (
        <div style={{ marginTop: '10px' }}>
          Timer: {timer} seconds
        </div>
      )}
      {expRunning &&
        <div>
          {currentImageIndex < totalPhotos && !isBlank && (
            <img
              src={`/Images/${shuffledIndexes[currentImageIndex] + 1}.png`}
              alt={`Image ${shuffledIndexes[currentImageIndex] + 1}`}
              className='h-[100vh] w-[99vw]'
            />
          )}
          {isBlank && 
              <div className='h-[100vh] w-[98vw] '></div>
          }
        </div>
      }
    </div>
      
      
    </>
  )
}

export default GazeRecorder