import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Postlogin() {
  // State variable to hold the current time
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update the current time every second
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    const interval = setInterval(updateTime, 1000); // Update time every second
    updateTime(); // Initialize immediately
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-[url('/burger.avif')] bg-cover bg-center h-screen flex flex-col justify-between">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 flex justify-between items-center w-full h-[44px] px-6">
        <div className="text-lg font-semibold text-white">{time}</div> {/* Display current time */}
        <div className="flex items-center">
          <img src="/network.svg" alt="Network" className="h-5 w-5 mx-1 filter-white" />
          <img src="/wifi.svg" alt="Wi-Fi" className="h-5 w-5 mx-1 filter-white" />
          <img src="/battery.svg" alt="Battery" className="h-5 w-5 mx-1 filter-white"/>
        </div>
      </div>

      {/* Bottom Div */}
      <div className="absolute bottom-0 left-0 w-full h-3/5 bg-white rounded-t-3xl flex items-center flex-col md:left-96 md:w-1/2">
        <div className="mt-2 text-center text-sm">
          <div className='border-t-4 w-20 rounded-full'></div> {/* Decorative line */}
        </div>

        <div className="mt-8">
          <img src="/congrats.png" className='border-red-400 h-48 se:h-32' /> {/* Congratulations image */}
        </div>

        <h1 className='font-bold text-3xl mb-8'>Login Successful</h1> {/* Success message */}

        <button 
          style={{ backgroundColor: '#FE8C00' }} 
          className="text-white p-4 rounded-3xl w-3/4 mb-6" 
          onClick={() => { navigate('/Track') }} // Navigate to tracking screen
        >
          Go to Tracking Screen
        </button>

        <span className='text-lg cursor-pointer' onClick={() => { navigate('/') }}>Logout</span> {/* Logout option */}

        <div className="absolute bottom-4 text-center text-sm">
          <div className='border-t-4 w-40 border-black rounded-full'></div> {/* Decorative line */}
        </div>
      </div>
    </div>
  );
}

export default Postlogin;
